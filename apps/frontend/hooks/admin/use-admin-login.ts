"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginAdmin, storeAdminUser } from "@/services/admin-api";
import { sweetAlert } from "@/components/alert/alert";
import { loginSchema, LoginValues } from "@/validation/login.schema";




export function useAdminLogin() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setMessage("");
    try {
      sweetAlert.loading("Login Admin", "Sedang memeriksa akun kamu...");

      const result = await loginAdmin(values);
      sweetAlert.close();

      storeAdminUser(result.user);


      await sweetAlert.success({
        title: "Login Berhasil",
        text: "Selamat datang di dashboard admin.",
        confirmButtonText: "Masuk Dashboard",
      });

      router.replace("/admin");
      
      router.refresh();
    } catch (error) {
        const errorMessage =
        error instanceof Error ? error.message : "Login gagal";

      setMessage(errorMessage);

      await sweetAlert.error({
        title: "Login Gagal",
        text: errorMessage,
      });
    }
  }

  return {
    form,
    message,
    onSubmit,
    isLoading : form.formState.isSubmitting
  };
}
