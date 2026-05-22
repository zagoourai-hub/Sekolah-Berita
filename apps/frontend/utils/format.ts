type DateInput = string | Date | null | undefined;

function parseDate(value: DateInput): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  /**
   * Input type="date" biasanya menghasilkan format:
   * 2026-05-21
   *
   * Kita parse manual supaya tidak kena masalah timezone.
   */
  const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

  if (dateOnlyPattern.test(value)) {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatDate(value: DateInput, fallback = "-") {
  const date = parseDate(value);

  if (!date) {
    return fallback;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(value: DateInput, fallback = "-") {
  const date = parseDate(value);

  if (!date) {
    return fallback;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value: DateInput, fallback = "-") {
  const date = parseDate(value);

  if (!date) {
    return fallback;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatAgendaDay(value: DateInput) {
  const date = parseDate(value);

  if (!date) {
    return {
      day: "--",
      month: "---",
    };
  }

  return {
    day: new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
    }).format(date),

    month: new Intl.DateTimeFormat("id-ID", {
      month: "short",
    })
      .format(date)
      .toUpperCase(),
  };
}

export function formatInputDate(value: DateInput) {
  const date = parseDate(value);

  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function stripHtml(value?: string | null) {
  if (!value) {
    return "";
  }

  return value.replace(/<[^>]*>/g, "").trim();
}

export function categorySlug(name?: string | null) {
  return (name ?? "kegiatan").toLowerCase().replace(/\s+/g, "-");
}
