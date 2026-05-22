# Struktur Docker

Project ini dibungkus dengan 3 service utama:

- `db`: MariaDB
- `backend`: NestJS + Prisma
- `frontend`: Next.js

## File Penting

- `docker-compose.yml`
- `.env.docker.example`
- `apps/backend/Dockerfile`
- `apps/frontend/Dockerfile`
- `apps/backend/.dockerignore`
- `apps/frontend/.dockerignore`

## Alur Start

1. MariaDB hidup lebih dulu
2. Backend menunggu database sehat
3. Backend menjalankan:
   - `prisma generate`
   - `prisma migrate deploy`
   - `prisma:seed`
   - `start:prod`
4. Frontend menunggu backend sehat
5. Frontend menjalankan:
   - `next build`
   - `next start`
