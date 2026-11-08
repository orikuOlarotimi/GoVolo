"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";
import { useApiFetch } from "@/utils/useApiFetch";
import { toDateString } from "@/lib/bookingHelpers";
import type { User } from "@/types/auth";

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

// Same rules as the backend, so errors show before a request is sent
const TEXT_RULES = {
  firstName: { label: "First name", max: 50 },
  lastName: { label: "Last name", max: 50 },
  city: { label: "City", max: 100 },
  country: { label: "Country", max: 100 },
} as const;

const TEXT_REGEX = /^[\p{L}][\p{L}\s'’.-]*$/u;
const DOB_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const MIN_DOB = "1900-01-01";

const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

type FormValues = {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  gender: string;
  dob: string;
};
type Field = keyof FormValues;
type FormErrors = Partial<Record<Field, string>>;

const EMPTY_FORM: FormValues = {
  firstName: "",
  lastName: "",
  city: "",
  country: "",
  gender: "",
  dob: "",
};

const fromUser = (u: User): FormValues => ({
  firstName: u.firstName,
  lastName: u.lastName,
  city: u.city,
  country: u.country,
  gender: u.gender,
  // stored as UTC midnight, so the first 10 characters are the right date
  dob: u.dob ? u.dob.slice(0, 10) : "",
});

const validate = (values: FormValues, today: string): FormErrors => {
  const errors: FormErrors = {};

  (Object.keys(TEXT_RULES) as (keyof typeof TEXT_RULES)[]).forEach((field) => {
    const { label, max } = TEXT_RULES[field];
    const value = values[field].trim();
    if (value.length < 2 || value.length > max) {
      errors[field] = `${label} must be between 2 and ${max} characters`;
    } else if (!TEXT_REGEX.test(value)) {
      errors[field] = `${label} contains characters that aren't allowed`;
    }
  });

  if (!GENDERS.some((g) => g.value === values.gender)) {
    errors.gender = "Choose a gender option";
  }

  if (!DOB_REGEX.test(values.dob)) {
    errors.dob = "Enter a valid date of birth";
  } else if (today && values.dob > today) {
    errors.dob = "Date of birth can't be in the future";
  } else if (values.dob < MIN_DOB) {
    errors.dob = "Date of birth is too far in the past";
  }

  return errors;
};

const inputClass = (hasError: boolean) =>
  `w-full min-w-0 rounded-xl border bg-[rgb(248,250,252)] p-3 text-[rgb(15,23,41)] outline-none transition-all focus:ring-2 focus:ring-[rgb(14,168,230)]/20 disabled:cursor-not-allowed disabled:opacity-60 ${
    hasError
      ? "border-red-400"
      : "border-[rgb(225,231,239)] focus:border-[rgb(14,168,230)]"
  }`;

const labelClass = "mb-2 block text-sm font-semibold text-[rgb(15,23,41)]";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const apiFetch = useApiFetch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // The account layout only renders this page once the user has loaded
  const [form, setForm] = useState<FormValues>(() =>
    user ? fromUser(user) : EMPTY_FORM,
  );
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [today, setToday] = useState("");

  // Set after mount so the server and the browser can't disagree about "today"
  useEffect(() => {
    setToday(toDateString(new Date()));
  }, []);

  if (!user) return null;

  const locked = user.status !== "verified";
  const errors = validate(form, today);
  const hasErrors = Object.keys(errors).length > 0;

  // Compare against what's saved, so "unsaved changes" needs no extra state
  const current = fromUser(user);
  const trimmed: FormValues = {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    city: form.city.trim(),
    country: form.country.trim(),
    gender: form.gender,
    dob: form.dob,
  };
  const changedFields = (Object.keys(trimmed) as Field[]).filter(
    (f) => trimmed[f] !== current[f],
  );
  const dirty = changedFields.length > 0;
  const canSave = !locked && dirty && !hasErrors && !saving && !uploading;

  const setField = (field: Field, value: string) =>
    setForm((cur) => ({ ...cur, [field]: value }));
  const touch = (field: Field) =>
    setTouched((cur) => ({ ...cur, [field]: true }));
  const showError = (field: Field) =>
    touched[field] ? errors[field] : undefined;

  const discard = () => {
    setForm(fromUser(user));
    setTouched({});
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;

    // Only send what changed
    const body: Partial<FormValues> = {};
    changedFields.forEach((f) => {
      body[f] = trimmed[f];
    });

    setSaving(true);
    try {
      const res = await apiFetch<{
        success: boolean;
        message: string;
        user: User;
      }>("/api/users/me", { method: "PATCH", body, requiresAuth: true });

      updateUser(res.user);
      setForm(fromUser(res.user));
      setTouched({});
      toast.success(res.message);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again later
    if (!file) return;

    if (!AVATAR_TYPES.includes(file.type)) {
      toast.error("Choose a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      toast.error("Image must be 2MB or smaller.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const res = await apiFetch<{
        success: boolean;
        message: string;
        user: User;
      }>("/api/users/me/avatar", {
        method: "PATCH",
        body: formData,
        requiresAuth: true,
      });
      updateUser(res.user);
      toast.success(res.message);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  const textField = (field: keyof typeof TEXT_RULES, autoComplete: string) => (
    <div className="min-w-0">
      <label htmlFor={field} className={labelClass}>
        {TEXT_RULES[field].label}
      </label>
      <input
        id={field}
        type="text"
        autoComplete={autoComplete}
        maxLength={TEXT_RULES[field].max}
        value={form[field]}
        disabled={locked || saving}
        onChange={(e) => setField(field, e.target.value)}
        onBlur={() => touch(field)}
        className={inputClass(!!showError(field))}
      />
      {showError(field) && (
        <p className="mt-1.5 text-xs text-red-500">{showError(field)}</p>
      )}
    </div>
  );

  return (
    <div className="min-w-0 space-y-6 py-4">
      <h1 className="text-xl font-bold text-[rgb(15,23,41)] sm:text-2xl">
        My Profile
      </h1>

      {locked && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Your account isn&apos;t verified yet, so profile changes are turned
          off. Log in again to receive a new verification code.
        </p>
      )}

      {/* Avatar and identity */}
      <div className="flex min-w-0 flex-col items-center gap-4 rounded-2xl border border-[rgb(225,231,239)] bg-white p-4 sm:flex-row sm:p-6">
        <div className="relative shrink-0">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#20c997] text-3xl font-bold text-white">
              {user.firstName[0]}
            </div>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={locked || uploading}
            aria-label="Change profile picture"
            className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[rgb(14,168,230)] text-white shadow hover:bg-[rgb(13,150,208)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <h2 className="break-words text-lg font-bold text-[rgb(15,23,41)]">
            {user.firstName} {user.lastName}
          </h2>
          <p className="break-all text-sm text-[rgb(99,111,129)]">
            {user.email}
          </p>
          <span
            className={`mt-2 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
              locked
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {locked ? "Pending verification" : "Verified"}
          </span>
          <p className="mt-2 text-xs text-[rgb(99,111,129)]">
            JPG, PNG or WebP, up to 2MB.
          </p>
        </div>
      </div>

      {/* Details form */}
      <form
        noValidate
        onSubmit={handleSave}
        className="min-w-0 space-y-5 rounded-2xl border border-[rgb(225,231,239)] bg-white p-4 sm:p-6"
      >
        <h2 className="font-semibold text-[rgb(15,23,41)]">Personal details</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {textField("firstName", "given-name")}
          {textField("lastName", "family-name")}

          <div className="min-w-0">
            <label htmlFor="gender" className={labelClass}>
              Gender
            </label>
            <select
              id="gender"
              value={form.gender}
              disabled={locked || saving}
              onChange={(e) => setField("gender", e.target.value)}
              onBlur={() => touch("gender")}
              className={inputClass(!!showError("gender"))}
            >
              {GENDERS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
            {showError("gender") && (
              <p className="mt-1.5 text-xs text-red-500">
                {showError("gender")}
              </p>
            )}
          </div>

          <div className="min-w-0">
            <label htmlFor="dob" className={labelClass}>
              Date of birth
            </label>
            <input
              id="dob"
              type="date"
              autoComplete="bday"
              min={MIN_DOB}
              max={today || undefined}
              value={form.dob}
              disabled={locked || saving}
              onChange={(e) => setField("dob", e.target.value)}
              onBlur={() => touch("dob")}
              className={inputClass(!!showError("dob"))}
            />
            {showError("dob") && (
              <p className="mt-1.5 text-xs text-red-500">{showError("dob")}</p>
            )}
          </div>

          {textField("city", "address-level2")}
          {textField("country", "country-name")}

          <div className="min-w-0 sm:col-span-2">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              readOnly
              className={inputClass(false)}
            />
            <p className="mt-1.5 text-xs text-[rgb(99,111,129)]">
              Your email can&apos;t be changed here.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          {dirty && (
            <button
              type="button"
              onClick={discard}
              disabled={saving}
              className="rounded-xl border border-[rgb(225,231,239)] px-6 py-3 font-semibold text-[rgb(15,23,41)] hover:bg-[rgb(242,245,247)] disabled:opacity-50"
            >
              Discard changes
            </button>
          )}
          <button
            type="submit"
            disabled={!canSave}
            className="rounded-xl bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] px-8 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
