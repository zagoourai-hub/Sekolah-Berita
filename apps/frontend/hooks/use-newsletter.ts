"use client";

import { FormEvent, useState } from "react";

import { apiBaseUrl } from "@/services/public-api";

export function useNewsletter() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");

    try {
      const response = await fetch(`${apiBaseUrl}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Gagal berlangganan");
      setMessage("Terima kasih, email Anda berhasil didaftarkan.");
      event.currentTarget.reset();
    } catch {
      setMessage("Newsletter belum tersambung. Coba lagi saat API aktif.");
    } finally {
      setPending(false);
    }
  }

  return { message, pending, handleSubmit };
}
