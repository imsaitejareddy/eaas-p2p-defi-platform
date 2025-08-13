FROM node:20-alpine
WORKDIR /app
# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install
# Copy the rest of the frontend code
COPY frontend/ ./
# Install vite globally so the dev script can run
RUN npm install -g vite
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
