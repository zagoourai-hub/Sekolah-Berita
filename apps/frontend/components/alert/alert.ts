"use client";

import Swal from "sweetalert2";

type AlertType = "success" | "error" | "warning" | "info" | "question";

type AlertOptions = {
  title?: string;
  text?: string;
  icon?: AlertType;
  cancelButtonText?: string;
  confirmButtonText?: string;
};

export const sweetAlert = {
  loading(title = "Memproses...", text = "Mohon tunggu sebentar") {
    return Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

  success({
    title = "Berhasil",
    text = "Aksi berhasil dilakukan",
    confirmButtonText = "Oke",
  }: AlertOptions = {}) {
    return Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonText,
      confirmButtonColor: "#16a34a",
    });
  },

  error({
    title = "Gagal",
    text = "Terjadi kesalahan",
    confirmButtonText = "Coba Lagi",
  }: AlertOptions = {}) {
    return Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonText,
      confirmButtonColor: "#dc2626",
    });
  },

  confirm({
  title = "Apakah kamu yakin?",
  text = "Data yang sudah dihapus tidak bisa dikembalikan.",
  confirmButtonText = "Ya, hapus",
}: AlertOptions = {}) {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Batal",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  });
},

  warning({
    title = "Peringatan",
    text = "Periksa kembali data kamu",
    confirmButtonText = "Mengerti",
  }: AlertOptions = {}) {
    return Swal.fire({
      icon: "warning",
      title,
      text,
      confirmButtonText,
      confirmButtonColor: "#f59e0b",
    });
  },

  close() {
    Swal.close();
  },
};