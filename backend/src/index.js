import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Create a new user or return existing
app.post('/users', async (req, res) => {
  const { wallet } = req.body;
  if (!wallet) return res.status(400).json({ error: 'wallet required' });
  let user = await prisma.user.findUnique({ where: { wallet } });
  if (!user) {
    user = await prisma.user.create({ data: { wallet } });
  }
  res.json(user);
});

// Get all offers
app.get('/offers', async (req, res) => {
  const offers = await prisma.offer.findMany({ include: { seller: true } });
  res.json(offers);
});

// Create an offer (off-chain record)
app.post('/offers', async (req, res) => {
  const { sellerId, amount, priceWei } = req.body;
  if (!sellerId || !amount || !priceWei) return res.status(400).json({ error: 'invalid payload' });
  const offer = await prisma.offer.create({ data: { sellerId, amount: parseInt(amount), priceWei: String(priceWei) } });
  res.json(offer);
});

// Proxy to AI forecast
app.post('/ai/forecast', async (req, res) => {
  try {
    const resp = await fetch('http://ai:8000/forecast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

// Proxy to AI assistant
app.post('/ai/ask', async (req, res) => {
  try {
    const resp = await fetch('http://ai:8000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await resp.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Backend running on ${port}`);
});
