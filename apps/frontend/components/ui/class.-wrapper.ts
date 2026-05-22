export const adminUi = {
  card:
    "rounded-2xl border border-border bg-card text-card-foreground shadow-sm",

  cardPadding: "p-4 sm:p-6",

  cardHeader:
    "mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",

  title: "text-xl font-bold text-primary",

  description: "text-sm text-muted-foreground",

  label: "mb-2 block text-sm font-semibold text-foreground",

  input:
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30",

  textarea:
    "w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30",

  select:
    "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30",

  checkboxWrapper:
    "flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3 text-foreground",

  checkbox: "h-4 w-4 accent-primary",

  primaryButton:
    "inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto",

  secondaryButton:
    "inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto",

  editButton:
    "rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-accent",

  dangerButton:
    "rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive transition-colors hover:bg-destructive/15 disabled:opacity-60",

  message:
    "rounded-xl border border-border bg-accent px-4 py-3 text-sm text-accent-foreground",

  errorText: "mt-1 text-xs font-medium text-destructive",

  listItem:
    "rounded-2xl border border-border bg-muted p-4 text-foreground",

  listRow:
    "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",

  listMeta:
    "flex w-full flex-wrap items-start gap-2 sm:w-auto sm:justify-end",

  listTitle: "break-words font-bold text-foreground",

  listSubtitle: "mt-1 break-all text-sm text-muted-foreground sm:break-words",

  badge:
    "rounded-full border border-border bg-card px-3 py-1 text-xs font-bold text-foreground",

  statusPublished:
    "rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-bold text-success",

  statusDraft:
    "rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-bold text-warning",

  plusIcon: "text-xl font-bold text-secondary",
};
