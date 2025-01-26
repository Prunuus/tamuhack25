from datasets import load_dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
    BitsAndBytesConfig  # Added for 4-bit quantization
)
from peft import LoraConfig, get_peft_model  # Added for PEFT
from huggingface_hub import login
import torch

OUTPUT_DIR = "tinyllama-lora-finetuned"
login(token="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")

# Configuration
checkpoint = "TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T"
dataset_name = "Krizim/hackathon-ideas"

# Load and prepare dataset
raw_datasets = load_dataset(dataset_name)
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
tokenizer.pad_token = tokenizer.eos_token

def tokenize_function(examples):
    return tokenizer(
        examples["title"],
        truncation=True,
        max_length=128,
        padding="max_length"
    )

tokenized_datasets = raw_datasets.map(tokenize_function, batched=True)
split_datasets = tokenized_datasets["train"].train_test_split(test_size=0.2)  # 80/20 split

# Load model with 4-bit quantization and LoRA
model = AutoModelForCausalLM.from_pretrained(
    checkpoint,
    device_map="cpu"
)

peft_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(model, peft_config)
model.print_trainable_parameters()  # Should show ~0.1% trainable params

# Training arguments with early stopping
training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    per_device_train_batch_size=8,  # Up from ~1-2 (adjust based on RAM)
    learning_rate=3e-4,             # Up from ~1e-5 (faster convergence)
    warmup_ratio=0.1,               # Better LR scheduling
    gradient_accumulation_steps=2,  # Simulate larger batches
    weight_decay=0.01,              # Regularization
    fp16=True,                      # If GPU available
    logging_steps=50,
    optim="adamw_torch",
    num_train_epochs=4
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
    train_dataset=split_datasets["train"],
    eval_dataset=split_datasets["test"],  # For early stopping
    data_collator=data_collator,
)

# Start training
train_result = trainer.train()
trainer.save_model(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)