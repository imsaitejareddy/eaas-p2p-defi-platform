# High‑Level Design

The platform is composed of five subsystems that interact to provide a cohesive Energy‑as‑a‑Service experience:

## 1. Blockchain Layer

A local Hardhat network (or a Polygon/Arbitrum testnet in production) hosts the smart contracts. The `EnergyCredit` ERC‑20 represents fungible energy credits. `EnergyAsset` is an NFT registry storing metadata about each physical asset. The `Marketplace` escrow contract enables sellers to list energy and buyers to purchase it with ETH. `EnergyLoan` and `EnergyDAO` demonstrate how DeFi primitives and governance can be layered on top of the same token economy.

## 2. Backend API

The Node.js backend mediates between the frontend, AI service, database, and blockchain. It provides REST endpoints for user management, offer creation, and retrieval of on‑chain/off‑chain data. It uses Ethers.js to sign and send transactions, and Prisma to persist off‑chain data. Future extensions could include WebSocket listeners that index contract events and update the database in real time.

## 3. AI Service

A Python FastAPI microservice is responsible for advanced analytics. In this skeleton it returns random forecasts and canned answers, but it is designed to host ML models (e.g., an LSTM trained on historical generation/consumption data) and a RAG pipeline built on top of a vector store such as ChromaDB. The backend can call this service to enrich responses or generate insights for users.

## 4. Frontend Web App

The frontend is a SPA built with React and Vite. It connects to the blockchain via ethers.js, allowing users to connect their MetaMask wallet, view balances and NFTs, and interact with contracts. React Router is used to navigate between dashboard, marketplace, DeFi, and chat pages. State management can be added via Zustand or Redux for more complex flows.

## 5. DevOps

Dockerfiles and a Compose file enable reproducible builds and deployment. A GitHub Actions workflow provides a template for continuous integration, running unit tests and linting on every push. Future improvements include automated contract deployment and front‑end builds on pull requests.

This design document should be expanded as the project grows to include detailed API contracts, database ER diagrams, and machine‑learning model documentation.

## 4. AI/ML Forecasting Module

An additional `ai-ml` service provides an extensible environment for training and serving machine‑learning models. It includes:

- A small sample dataset of energy production and consumption to bootstrap experiments.
- An LSTM time‑series model built with PyTorch (`ai-ml/model/train.py`), which predicts the next time step’s production and consumption based on the previous step.
- A FastAPI server (`ai-ml/app/main.py`) that loads the trained model and exposes a `/forecast` endpoint on port 9000.

This module can be expanded with more sophisticated models (transformers, exogenous inputs) and integrated into the main backend via REST calls.
