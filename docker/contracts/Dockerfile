FROM node:20-alpine
WORKDIR /app
# Copy package manifests for Hardhat and install dependencies
COPY hardhat/package*.json ./
RUN npm install
# Copy the entire Hardhat project
COPY hardhat/ ./
# Expose Hardhat local network port
EXPOSE 8545
CMD ["npx", "hardhat", "node", "--hostname", "0.0.0.0"]
