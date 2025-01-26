from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch
from datasets import load_dataset
import json
import random


model_path = "./tinyllama-lora-finetuned"  # Your fine-tuned model folder
tokenizer = AutoTokenizer.from_pretrained("./tinyllama-lora-finetuned")
model = AutoModelForCausalLM.from_pretrained(
    model_path,
    device_map="auto" 
)

tokenizer.pad_token = tokenizer.eos_token

generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=100,
    temperature=0.7,
    do_sample=True
)

prompt = """You are a creative project name generator. Follow these rules:
1. Respond ONLY with the project name format below
2. Never repeat the prompt or add explanations
3. Format: "Porject Name: [Name]"
"""
response = generator(prompt)
with open("ideas.json", "r") as file:
    data = json.load(file)

def extract_project_name(generated_text):
    target = "project name: "
    # Find the index in a case-insensitive manner
    index = generated_text.lower().find(target.lower())
    if index != -1:
        return generated_text[index:]
    else:
        return random.choice(data)['title']


project_name = extract_project_name(response[0]["generated_text"])
print(project_name) 

# # 5. Alternative manual generation
# inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
# outputs = model.generate(
#     **inputs,
#     max_new_tokens=100,
#     temperature=0.7,
#     do_sample=True
# )
# print("\nManual generation:", tokenizer.decode(outputs[0], skip_special_tokens=True))