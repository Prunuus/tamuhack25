# Install transformers from source - only needed for versions <= v4.34
# pip install git+https://github.com/huggingface/transformers.git
# pip install accelerate

import torch
from transformers import pipeline

pipe = pipeline("text-generation", model="HuggingFaceH4/zephyr-7b-beta", device_map="cpu")

messages = [
    {
        "role": "system",
        "content":  """prompt_template = 
You are a creative project name generator. Follow these rules:
1. Respond ONLY with the project name format below
2. Never repeat the question or add explanations
3. Format: "Porject Name: [Name]"

Example Response:
Projoct Name: QuantumSail - AI Navigation System
""",
    },
    {"role": "user", "content": "Can you generate an out of the box project idea for me?"},
]
prompt = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
outputs = pipe(prompt, max_new_tokens=50, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
print(outputs[0]["generated_text"])

def extract_project_name(generated_text):
    # Split into lines and find the first line containing "Project Name:"
    for line in generated_text.split('\n'):
        if "project name:" in line.lower:
            # Clean up extra spaces and return
            return line.strip().replace("Project Name:", "").strip()
    return "No project name found"  # Fallback

project_name = extract_project_name(outputs[0]["generated_text"])
print(project_name)  # Output: JollyRouter - Autonomous Plunder Navigation System