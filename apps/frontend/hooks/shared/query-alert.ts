"use client";

import { sweetAlert } from "@/components/alert/alert";

export function getQueryErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}

type MutationAlertOptions = {
  loadingTitle: string;
  loadingText?: string;
  successTitle?: string;
  successText: string;
  errorTitle?: string;
};

export function createMutationAlertHandlers(options: MutationAlertOptions) {
  return {
    onMutate: () => {
      sweetAlert.loading(
        options.loadingTitle,
        options.loadingText ?? "Mohon tunggu sebentar",
      );
    },
    onSuccess: () => {
      sweetAlert.success({
        title: options.successTitle ?? "Berhasil",
        text: options.successText,
      });
    },
    onError: (error: unknown) => {
      sweetAlert.error({
        title: options.errorTitle ?? "Gagal",
        text: getQueryErrorMessage(error),
      });
    },
  };
}
