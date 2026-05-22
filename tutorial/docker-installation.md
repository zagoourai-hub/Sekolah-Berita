# Tutorial Install Docker dan Menjalankan Project

Tutorial ini dibuat untuk pengguna Windows yang masih baru belajar Docker.

Tujuan akhirnya sederhana:

1. Docker Desktop terpasang
2. Project bisa dijalankan
3. Anda tahu cara start, stop, dan cek apakah project sudah hidup

## Bagian A - Install Docker Desktop

### 1. Pastikan virtualisasi aktif

Docker Desktop di Windows biasanya butuh virtualisasi aktif.

Kalau di laptop Anda Docker Desktop sudah bisa dibuka dan statusnya `Engine running`, berarti bagian ini aman dan bisa lanjut.

Kalau belum:

1. Restart laptop
2. Masuk BIOS atau UEFI
3. Cari menu seperti `Virtualization`, `Intel VT-x`, atau `SVM Mode`
4. Aktifkan
5. Simpan lalu masuk lagi ke Windows

### 2. Install WSL jika diminta

Beberapa komputer Windows perlu WSL 2 agar Docker Desktop bisa berjalan dengan baik.

Buka PowerShell sebagai Administrator, lalu jalankan:

```powershell
wsl --install
```

Kalau selesai, restart komputer.

Kalau perintah itu gagal karena WSL sudah ada, biasanya tidak masalah.

### 3. Install Docker Desktop

Karena di folder utama project ini sudah ada file `Docker Desktop Installer.exe`, cara termudah adalah:

1. Buka folder `D:\Project\Sekolah Tema Berita`
2. Jalankan file `Docker Desktop Installer.exe`
3. Klik `Next` atau `Install`
4. Kalau ada pilihan `Use WSL 2 instead of Hyper-V`, biarkan aktif
5. Tunggu sampai selesai
6. Restart komputer jika diminta

Setelah itu buka Docker Desktop.

Tanda Docker siap dipakai:

- aplikasi Docker Desktop berhasil terbuka
- bagian bawah menunjukkan `Engine running`

### 4. Cek apakah Docker sudah siap

Buka PowerShell lalu jalankan:

```powershell
docker --version
docker compose version
```

Kalau dua perintah itu mengeluarkan versi, berarti Docker sudah siap.

## Bagian B - Menjalankan Project Ini

### 1. Buka folder project yang benar

Masuk ke folder project:

```powershell
cd "D:\Project\Sekolah Tema Berita\school"
```

Penting:

- folder yang dipakai adalah `school`
- di dalam folder ini ada file `docker-compose.yml`

### 2. Pastikan file `.env` ada

Project ini membaca file `.env`.

Di project ini file `.env` sudah disiapkan. Kalau suatu saat file itu hilang, Anda bisa membuat ulang dari contoh:

```powershell
Copy-Item .env.docker.example .env
```

Isi default yang dipakai saat ini:

- frontend di port `3000`
- backend di port `4000`
- database MariaDB di port `3306`

### 3. Jalankan semua service Docker

Gunakan perintah ini:

```powershell
docker compose up --build -d
```

Arti perintah ini:

- `docker compose` = menjalankan project Docker
- `up` = menyalakan service
- `--build` = membangun image project lebih dulu
- `-d` = berjalan di background, jadi terminal tetap bisa dipakai

Saat pertama kali dijalankan, prosesnya bisa agak lama. Ini normal karena Docker akan:

- download image dasar
- install dependency backend dan frontend
- build aplikasi
- menyalakan database, backend, dan frontend

### 4. Cek apakah project sudah hidup

Jalankan:

```powershell
docker compose ps
```

Kalau berhasil, biasanya Anda akan melihat 3 service:

- `db`
- `backend`
- `frontend`

Kalau statusnya `Up` atau `healthy`, artinya service sudah berjalan.

### 5. Buka project di browser

Alamat yang bisa dibuka:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000/api/settings`
- Swagger: `http://localhost:4000/api/docs`
- Login admin: `http://localhost:3000/admin/login`

### 6. Login admin awal

Data admin awal bawaan:

- Email: `admin@smknusantara.sch.id`
- Password: `admin12345`

Kalau nanti Anda mengganti isi file `.env`, data login bisa ikut berubah.

## Bagian C - Perintah Penting yang Wajib Diketahui

### Menjalankan project lagi

Kalau project sebelumnya pernah dibuild dan Anda mau menyalakan lagi:

```powershell
docker compose up -d
```

Kalau Anda habis mengubah Dockerfile atau ingin build ulang:

```powershell
docker compose up --build -d
```

### Melihat log error

Kalau project tidak mau tampil di browser:

```powershell
docker compose logs -f
```

Kalau hanya ingin lihat log frontend:

```powershell
docker compose logs -f frontend
```

Kalau hanya ingin lihat log backend:

```powershell
docker compose logs -f backend
```

### Mematikan project

```powershell
docker compose down
```

Perintah ini mematikan container, tapi data Docker masih disimpan.

### Menghapus data Docker project

Kalau Anda ingin reset database dan upload:

```powershell
docker compose down -v
```

Hati-hati:

Perintah ini akan menghapus data volume Docker project ini, termasuk database lokal.

## Bagian D - Kalau Terjadi Error

### 1. Browser tidak bisa membuka `localhost:3000`

Coba cek:

```powershell
docker compose ps
docker compose logs -f frontend
```

### 2. Backend error atau admin tidak bisa login

Cek:

```powershell
docker compose logs -f backend
```

### 3. Docker Desktop terbuka tapi project tidak jalan

Pastikan:

- Docker Desktop benar-benar `Engine running`
- Anda menjalankan perintah dari folder `school`
- file `.env` ada

### 4. Port bentrok

Kalau port `3000`, `4000`, atau `3306` sedang dipakai aplikasi lain, ubah nilainya di file `.env`, lalu jalankan ulang:

```powershell
docker compose up --build -d
```

## Ringkasan Super Singkat

Kalau Anda lupa semuanya, ingat 4 langkah ini:

1. Buka Docker Desktop
2. Buka PowerShell
3. Masuk ke folder project
4. Jalankan:

```powershell
cd "D:\Project\Sekolah Tema Berita\school"
docker compose up --build -d
```

Lalu buka:

- `http://localhost:3000`
