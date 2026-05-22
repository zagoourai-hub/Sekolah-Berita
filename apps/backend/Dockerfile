FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run prisma:generate && npm run build

EXPOSE 4000

CMD ["sh", "-c", "npm run prisma:generate && npx prisma migrate deploy && npm run prisma:seed && npm run start:prod"]
