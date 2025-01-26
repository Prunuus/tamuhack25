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

app = Flask(__name__)
CORS(app, resources={r"/licheng": {"origins": "localhost:3000"}})


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

#initialize everything needed
path = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"#"../tinyllama-lora-finetuned"
tokenizer = AutoTokenizer.from_pretrained(path)
model = AutoModelForCausalLM.from_pretrained(path, device_map="auto")
generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
)

@app.route('/ideas', methods=["POST"])
def generateResponse():
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




if __name__ == '__main__':
    app.run()