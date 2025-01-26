from datasets import load_dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
)
from huggingface_hub import login
import torch


OUTPUT_DIR = "cpu-finetuned-hackathon"
login(token="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")


checkpoint = "TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T"  # ~1.2GB with 8-bit
# checkpoint = "gpt2"  # Even smaller (~500MB)

# Load dataset
raw_datasets = load_dataset("Krizim/hackathon-ideas")


tokenizer = AutoTokenizer.from_pretrained(checkpoint)
tokenizer.pad_token = tokenizer.eos_token  # Critical for causal LM

# Tokenization function
def tokenize_function(example):
    return tokenizer(
        example["title"],
        truncation=True,
        max_length=128,  # Reduced for CPU compatibility
        padding="max_length"
    )

tokenized_datasets = raw_datasets.map(tokenize_function, batched=True)


model = AutoModelForCausalLM.from_pretrained(
    checkpoint,
    device_map="auto"
)


training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    num_train_epochs=1,  # Start with 1 epoch
    per_device_train_batch_size=1,  # Minimal batch size
    learning_rate=1e-5,  # Smaller learning rate
    optim="adamw_torch",  # Standard optimizer for CPU
    report_to="none",  # Disable logging if needed
)

# Data collator
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    data_collator=data_collator,
)


trainer.train()
trainer.save_model(OUTPUT_DIR)
tokenizer.save_model(OUTPUT_DIR)