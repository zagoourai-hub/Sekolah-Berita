# Tutorial Docker Sekolah Berita

## Kebutuhan

- Docker Desktop terpasang
- Docker Compose aktif
- Docker Desktop dalam keadaan berjalan

## 1. Clone Repository

```bash
git clone git@github-zagoour:zagoourai-hub/Sekolah-Berita.git
cd Sekolah-Berita
```

## 2. Siapkan File Environment Docker

Salin file contoh:

```bash
cp .env.docker.example .env.docker
```

Di Windows PowerShell:

```powershell
Copy-Item .env.docker.example .env.docker
```

Kalau perlu, ubah nilai berikut di `.env.docker`:

- `MYSQL_ROOT_PASSWORD`
- `MYSQL_DATABASE`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `FRONTEND_PORT`
- `BACKEND_PORT`
- `JWT_SECRET`

## 3. Jalankan Project

```bash
docker compose --env-file .env.docker up --build
```

Jika ingin mode background:

```bash
docker compose --env-file .env.docker up --build -d
```

## 4. Akses Aplikasi

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000/api`
- Swagger: `http://localhost:4000/api/docs`

## 5. Login Admin Default

- Email admin: nilai `SEED_ADMIN_EMAIL`
- Password admin: nilai `SEED_ADMIN_PASSWORD`

Default bawaan file contoh:

- Email: `admin@smknusantara.sch.id`
- Password: `admin12345`

## 6. Menghentikan Container

```bash
docker compose --env-file .env.docker down
```

## 7. Menghapus Data Database dan Upload

```bash
docker compose --env-file .env.docker down -v
```

Perintah ini akan menghapus:

- volume database MariaDB
- volume upload backend

## Catatan Teknis

- Service `db` memakai MariaDB.
- Service `backend` akan menjalankan migration deploy, seed, lalu start NestJS.
- Service `frontend` akan build Next.js di dalam container lalu start di port `3000`.
- Upload file backend disimpan di volume Docker agar tidak hilang saat restart container.
