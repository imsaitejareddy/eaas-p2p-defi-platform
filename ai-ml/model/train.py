import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import numpy as np

class EnergyDataset(Dataset):
    def __init__(self, path):
        df = pd.read_csv(path, comment='#')
        self.x = torch.tensor(df[['production','consumption']].values[:-1], dtype=torch.float32)
        self.y = torch.tensor(df[['production','consumption']].values[1:], dtype=torch.float32)
    def __len__(self):
        return len(self.x)
    def __getitem__(self, idx):
        return self.x[idx], self.y[idx]

class LSTMModel(nn.Module):
    def __init__(self, input_dim=2, hidden_dim=16, output_dim=2):
        super().__init__()
        self.lstm = nn.LSTM(input_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
    def forward(self, x):
        # x: (batch, features)
        x = x.unsqueeze(1)  # add sequence dimension
        out, _ = self.lstm(x)
        out = self.fc(out[:, -1, :])
        return out

# Simple training script (runs a few epochs)
def train(path='./sample_data/energy.csv', epochs=10):
    ds = EnergyDataset(path)
    loader = DataLoader(ds, batch_size=4, shuffle=True)
    model = LSTMModel()
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
    for epoch in range(epochs):
        total_loss = 0
        for x, y in loader:
            pred = model(x)
            loss = criterion(pred, y)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f"Epoch {epoch+1} loss {total_loss/len(loader):.4f}")
    # Save model state
    torch.save(model.state_dict(), 'lstm_model.pt')
    print('Model saved to lstm_model.pt')

if __name__ == '__main__':
    train()
