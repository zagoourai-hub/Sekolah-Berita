FROM node:20-bookworm-slim

WORKDIR /app

ARG DATABASE_URL=mysql://school_user:school_password@db:3306/db_sekolah
ENV DATABASE_URL=${DATABASE_URL}

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run prisma:generate && npm run build

EXPOSE 4000

CMD ["sh", "-c", "npm run prisma:generate && npx prisma migrate deploy && npm run start:prod"]
