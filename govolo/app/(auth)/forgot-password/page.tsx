"use client";

import { useState } from "react";
import Link from "next/link";
import AuthShell from "../../../components/auth/AuthShell";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required";
    if (!emailRegex.test(trimmed)) return "Invalid email sequence";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(email);
    if (validationError) {
      toast.error(validationError);
      setError(validationError);
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim().toLowerCase() }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Could not send reset link");

        setError(data.message || "Could not send reset link");
        setSubmitting(false);
        return;
      }

      toast.success(data.message || "A reset code has been sent to your email");
      router.push(
        `/reset-password?email=${encodeURIComponent(email.trim().toLowerCase())}`,
      );

      setSent(true);
    } catch {
      toast.error("Something went wrong, please try again");
      setError("Something went wrong, please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell
      topRight={
        <span>
          Need help?{" "}
          <Link href="/contact" className="font-semibold text-[#1aa6e0]">
            Contact support
          </Link>
        </span>
      }
    >
      {sent ? (
        <>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f9f2] font-[Plus_Jakarta_Sans,sans-serif]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#12b76a"
              strokeWidth={2}
              className="h-6 w-6"
            >
              <path
                d="M4 12l5 5L20 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="mt-5 text-[26px] font-extrabold tracking-tight text-[#10192b]">
            Check your inbox
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[#5b6779]">
            If an account exists for{" "}
            <span className="font-semibold text-[#10192b]">{email}</span>, we've
            sent a link to reset your password.
          </p>

          <Link
            href="/login"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#1aa6e0] to-[#5eead4] py-3.5 text-[15px] font-semibold text-white"
          >
            Back to log in
          </Link>

          <p className="mt-6 text-center text-[13.5px] text-[#5b6779]">
            Didn't get an email?{" "}
            <button
              type="button"
              onClick={() => setSent(false)}
              className="font-semibold text-[#1aa6e0]"
            >
              Try a different address
            </button>
          </p>
        </>
      ) : (
        <>
          <h2 className="text-[26px] font-extrabold tracking-tight text-[#10192b]">
            Forgot your password?
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[#5b6779]">
            Enter the email address linked to your account and we'll send you an
             otp to reset it.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <label
              htmlFor="forgot-email"
              className="mb-1.5 block text-[13.5px] font-medium text-[#374357]"
            >
              Email address
            </label>
            <div className="relative flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
              >
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m3.5 6 8.5 6 8.5-6" />
              </svg>
              <input
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                onBlur={() => setError(validate(email))}
                aria-invalid={!!error}
                className={`w-full rounded-[14px] border-[1.5px] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)] ${
                  error
                    ? "border-[#ef4444]"
                    : "border-[#e7ecf3] focus:border-[#1aa6e0]"
                }`}
              />
            </div>
            {/* {error && (
              <p className="mt-1.5 text-[13px] text-[#ef4444]">{error}</p>
            )} */}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#1aa6e0] to-[#5eead4] py-3.5 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {submitting ? "Sending link..." : "Send reset link"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-[#5b6779]">
            Remembered it?{" "}
            <Link href="/login" className="font-semibold text-[#1aa6e0]">
              Back to log in
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
