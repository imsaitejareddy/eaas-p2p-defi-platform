from fastapi import FastAPI
from pydantic import BaseModel
import random

app = FastAPI()

class ForecastRequest(BaseModel):
    user_id: str

class ChatRequest(BaseModel):
    question: str

@app.get("/health")
async def health() -> dict:
    return {"ok": True}

@app.post("/forecast")
async def forecast(req: ForecastRequest) -> dict:
    """Return a naive random forecast. Replace with ML model."""
    return {"prediction": random.random()}

@app.post("/ask")
async def ask(req: ChatRequest) -> dict:
    """Return a placeholder answer for the RAG assistant."""
    return {"answer": "This is a placeholder response from the AI assistant."}
