"use client";

import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { adminUi } from "../ui/class.-wrapper";



type Option = {
  label: string;
  value: string;
};

type BaseFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

function getErrorMessage<T extends FieldValues>(
  errors: FieldErrors<T>,
  name: Path<T>,
) {
  const error = errors[name];

  if (!error || typeof error.message !== "string") {
    return null;
  }

  return error.message;
}

export function AdminTextField<T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  errors,
}: BaseFieldProps<T>) {
  const errorMessage = getErrorMessage(errors, name);

  return (
    <div>
      <label className={adminUi.label}>{label}</label>
      <input
        {...register(name)}
        placeholder={placeholder}
        className={adminUi.input}
      />

      {errorMessage ? <p className={adminUi.errorText}>{errorMessage}</p> : null}
    </div>
  );
}

export function AdminDateTimeField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
}: BaseFieldProps<T>) {
  const errorMessage = getErrorMessage(errors, name);

  return (
    <div>
      <label className={adminUi.label}>{label}</label>
      <input type="datetime-local" {...register(name)} className={adminUi.input} />

      {errorMessage ? <p className={adminUi.errorText}>{errorMessage}</p> : null}
    </div>
  );
}

export function AdminTextareaField<T extends FieldValues>({
  name,
  label,
  placeholder,
  register,
  errors,
  rows = 4,
}: BaseFieldProps<T> & {
  rows?: number;
}) {
  const errorMessage = getErrorMessage(errors, name);

  return (
    <div>
      <label className={adminUi.label}>{label}</label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className={adminUi.textarea}
      />

      {errorMessage ? <p className={adminUi.errorText}>{errorMessage}</p> : null}
    </div>
  );
}

export function AdminSelectField<T extends FieldValues>({
  name,
  label,
  register,
  errors,
  options,
}: BaseFieldProps<T> & {
  options: Option[];
}) {
  const errorMessage = getErrorMessage(errors, name);

  return (
    <div>
      <label className={adminUi.label}>{label}</label>
      <select {...register(name)} className={adminUi.select}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {errorMessage ? <p className={adminUi.errorText}>{errorMessage}</p> : null}
    </div>
  );
}

export function AdminCheckboxField<T extends FieldValues>({
  name,
  label,
  register,
}: Pick<BaseFieldProps<T>, "name" | "label" | "register">) {
  return (
    <label className={adminUi.checkboxWrapper}>
      <input type="checkbox" {...register(name)} className={adminUi.checkbox} />
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </label>
  );
}