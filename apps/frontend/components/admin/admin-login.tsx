"use client";

import { LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminLogin } from "@/hooks/admin/use-admin-login";

export function AdminLogin() {
  const { form,  onSubmit } = useAdminLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="card-school w-full max-w-md">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <LockKeyhole className="size-8" />
            </div>

            <h1 className="text-2xl font-extrabold text-primary">
              Admin Portal
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Masuk untuk mengelola berita sekolah.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Mail className="size-4" />
                Email
              </span>

              <Input
                type="email"
                placeholder="admin@sekolah.sch.id"
                aria-invalid={!!errors.email}
                {...register("email")}
              />

              {errors.email ? (
                <span className="mt-1 block text-xs text-destructive">
                  {errors.email.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <LockKeyhole className="size-4" />
                Password
              </span>

              <Input
                type="password"
                placeholder="Masukkan password"
                aria-invalid={!!errors.password}
                {...register("password")}
              />

              {errors.password ? (
                <span className="mt-1 block text-xs text-destructive">
                  {errors.password.message}
                </span>
              ) : null}
            </label>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full"
            >
              {isSubmitting ? "Memproses..." : "Masuk Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}