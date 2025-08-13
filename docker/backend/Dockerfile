FROM node:20-alpine
WORKDIR /app
COPY backend/package.json ./package.json
RUN npm install
COPY backend/src ./src
COPY backend/prisma ./prisma
CMD ["npm", "run", "start"]
