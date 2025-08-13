# DeFi-Enabled P2P Energy-as-a-Service Platform

This project is a modernized implementation of a peer‑to‑peer Energy‑as‑a‑Service (EaaS) platform that leverages decentralized finance (DeFi), high‑throughput blockchain technology, AI‑driven energy forecasting, and a retrieval‑augmented generation (RAG) assistant. It evolves the original blockchain in renewable energy capstone into a scalable, modular application.

## Components

- **Smart Contracts** (`contracts/`):
  - `EnergyCredit.sol`: ERC‑20 token representing energy credits (kWh).
  - `EnergyAsset.sol`: ERC‑721 NFT registry for physical energy assets (solar panels, batteries) with metadata (capacity, location).
  - `Marketplace.sol`: P2P trading of energy credits using ETH; sellers escrow tokens and buyers pay ETH.
  - `EnergyLoan.sol`: Simple DeFi lending contract enabling users to borrow energy credits and repay with interest.
  - `EnergyDAO.sol` & `GovernanceToken.sol`: A bare‑bones DAO with proposal creation/voting and a governance token.

- **Backend** (`backend/`):
  - Node.js/Express server with endpoints for health checks, user management, offers, and proxies to smart contract interactions.
  - Placeholder integration for AI forecasting and chat services.
  - Prisma schema ready for PostgreSQL (users and offers tables).

- **AI Service** (`ai/`):
  - Python FastAPI service exposing `/forecast` for basic random energy forecasting and `/ask` for a placeholder RAG assistant.
  - Designed to be extended with real time‑series models (e.g., LSTM or Transformer) and retrieval from a vector database like ChromaDB.

- **Frontend** (`frontend/`):
  - React (Vite) application using React Router, with pages for Dashboard, Marketplace, DeFi, and Chat.
  - A simple navbar for navigation; connect your Web3 wallet (via ethers.js) and interact with contracts.

- **DevOps** (`docker/` & `docker-compose.yml`):
  - Dockerfiles for each service and a compose file orchestrating a Postgres database, local Hardhat node, backend API, AI service, and frontend.

- **CI/CD** (`.github/workflows/ci.yml`):
  - Basic GitHub Actions workflow that checks out code, installs Node and Python dependencies, and runs placeholder tests.

## Getting Started

Prerequisites: Node.js ≥ 18, Docker, and optionally `pnpm`/`npm` and `python3` if running services locally.

```bash
# Install dependencies and start local chain
cd contracts
npm install
npx hardhat node
```

In separate terminals:

```bash
# Deploy contracts (example script)
cd contracts
npx hardhat run scripts/deploy.ts --network localhost

# Start backend
cd backend
npm install
npm run start

# Start AI service
cd ai
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Start frontend
cd frontend
npm install
npm run dev
```

Alternatively, spin up everything with Docker Compose:

```bash
docker compose up --build
```

This will start Postgres, a local Hardhat node, the backend API on port 8080, the AI service on port 8000, and the React frontend on port 5173.

## Documentation

See `docs/DESIGN.md` for a high‑level architecture overview and `docs/API.md` (to be authored) for API details.
