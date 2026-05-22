# Penjelasan Struktur Docker Project Ini

Kalau Anda masih baru, anggap Docker di project ini seperti 3 mesin kecil yang saling bekerja sama.

## 1. Isi utama project Docker ini

Project ini punya 3 service:

- `db`
  Ini adalah database MariaDB
- `backend`
  Ini adalah server API yang dibuat dengan NestJS dan Prisma
- `frontend`
  Ini adalah tampilan website yang dibuat dengan Next.js

## 2. Urutan kerja saat project dinyalakan

Saat Anda menjalankan:

```powershell
docker compose up --build -d
```

Docker akan bekerja seperti ini:

1. Menyalakan database `db` lebih dulu
2. Setelah database sehat, backend ikut hidup
3. Setelah backend sehat, frontend ikut hidup

Jadi urutannya memang:

`db -> backend -> frontend`

## 3. File yang paling penting

### `docker-compose.yml`

Ini adalah file utama Docker project.

Fungsinya:

- menentukan service apa saja yang dijalankan
- menentukan port
- menentukan environment variable
- menentukan urutan startup

### `.env`

Ini adalah file konfigurasi sederhana.

Contohnya:

- username database
- password database
- port frontend
- port backend
- data admin awal

Kalau port ingin diganti, biasanya file ini yang diubah.

### `apps/backend/Dockerfile`

File ini berisi cara membangun backend di dalam Docker.

Backend di project ini akan:

1. install dependency
2. generate Prisma client
3. build NestJS
4. saat container hidup, menjalankan migration
5. menjalankan seed data
6. menyalakan backend

### `apps/frontend/Dockerfile`

File ini berisi cara membangun frontend di dalam Docker.

Frontend di project ini akan:

1. install dependency
2. build Next.js
3. menyalakan web di port `3000`

## 4. Port yang dipakai

Default port project ini:

- frontend: `3000`
- backend: `4000`
- database: `3306`

Kalau salah satu port itu sedang dipakai aplikasi lain, Anda bisa menggantinya lewat file `.env`.

## 5. Kenapa project ini cocok dijalankan pakai Docker

Keuntungan Docker untuk project ini:

- tidak perlu install database MariaDB manual
- backend, frontend, dan database dijalankan dengan satu perintah
- setup lebih rapi
- lebih mudah dipindahkan ke komputer lain

## 6. Singkatnya

Kalau mau mengingat dengan cara paling mudah:

- `db` menyimpan data
- `backend` mengurus logika dan API
- `frontend` menampilkan website

Semua itu dinyalakan bersama oleh `docker compose`.
