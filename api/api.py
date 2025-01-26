import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    pipeline
)
import torch
import json
import random
from db import db
# from routes.auth import auth_bp
# import bcrypt
from db import db, client
from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM



app = Flask(__name__)
CORS(app, resources={r"/ideas": {"origins": "http://localhost:3000"}})



try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
with open("../ideas.json", "r") as file:
     data = json.load(file)

def extract_project_name(generated_text):
    target = "project name: "
    # Find the index in a case-insensitive manner
    index = generated_text.lower().find(target.lower())
    if index != -1:
        return generated_text[index:]
    else:
        return random.choice(data)['title']

def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow all origins for development
    
    try:
        # Test database connection using the existing client from db.py
        db.command('ping')
        print("✅ Successfully connected to MongoDB!")
        
        # Create indexes (add this)
        db.users.create_index([("email", 1)], unique=True)
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        
   
    app.register_blueprint(auth_bp)
    return app

app = create_app()
#initialize everything needed
# path = 'TinyLlama/TinyLlama-1.1B-Chat-v1.0' #"../tinyllama-lora-finetuned"
model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
)



def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=100)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)


@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data['prompt']
    
    try:
        response = generate_response(prompt)  # Your model function
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/ideas', methods=["POST","GET"])
def ideas():
    try:
        data = request.get_json()
        use_fine_tuned = data.get('use_fine_tuned', False)
        
        if use_fine_tuned:
            prompt = """You are a creative project name generator. Follow these rules:
            1. Respond ONLY with the project name format below
            2. Never repeat the prompt or add explanations
            3. Format: "Porject Name: [Name]"""
            
            generated = generator(
                prompt,
                max_new_tokens=100,
                do_sample=True,
                temperature=0.7,
                top_k=50,
                top_p=0.95
            )

            project_name = extract_project_name(generated[0]["generated_text"])

            return jsonify({'idea': project_name})
            
        else:
            # Default response if not using fine-tuned model
            return jsonify({'idea': 'Button not enabled'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ app.route('/users', methods=['GET'])
def get_users():
    try:
        users = list(db.users.find())
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=["GET"])
def home():
    return "Welcome to the API"

@app.teardown_appcontext
def close_db_connection(exception=None):
    db.client.close()

if __name__ == '__main__':
    app.run()