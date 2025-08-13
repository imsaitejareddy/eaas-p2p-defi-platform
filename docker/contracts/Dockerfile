FROM node:20-alpine
WORKDIR /contracts
COPY contracts/package.json ./package.json
RUN npm install
COPY contracts ./
CMD ["npx", "hardhat", "node"]
