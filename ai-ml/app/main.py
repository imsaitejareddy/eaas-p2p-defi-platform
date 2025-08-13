from fastapi import FastAPI
from pydantic import BaseModel
import torch
import torch.nn as nn
import numpy as np

app = FastAPI()

class ForecastRequest(BaseModel):
    production: float
    consumption: float

class LSTMModel(nn.Module):
    def __init__(self, input_dim=2, hidden_dim=16, output_dim=2):
        super().__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
    def forward(self, x):
        x = x.unsqueeze(1)
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return out

# Load model weights if available
model = LSTMModel()
try:
    state_dict = torch.load('lstm_model.pt')
    model.load_state_dict(state_dict)
    model.eval()
except FileNotFoundError:
    model = None

@app.post('/forecast')
async def forecast(req: ForecastRequest):
    if model is None:
        return {'error': 'Model not trained yet'}
    with torch.no_grad():
        inp = torch.tensor([[req.production, req.consumption]], dtype=torch.float32)
        pred = model(inp)[0].numpy().tolist()
    return {'prediction_production': pred[0], 'prediction_consumption': pred[1]}
