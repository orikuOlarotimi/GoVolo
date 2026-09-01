"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell from "../../../components/auth/AuthShell";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("resetToken") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const validatePassword = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Password is required";
    if (trimmed.length <= 5) return "Password must be more than 5 characters";
    return "";
  };

  const validateConfirm = (value: string, original: string) => {
    if (value.trim() !== original.trim()) return "Passwords do not match";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    const confirmError = validateConfirm(confirmPassword, password);
    setErrors({ password: passwordError, confirmPassword: confirmError });

    if (passwordError || confirmError) return;

    if (!token || !email) {
      toast.error("This reset link is invalid or has expired");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            resetToken: token,
            newPassword: password.trim(),
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Could not reset your password");
        setSubmitting(false);
        return;
      }

      setDone(true);
      toast.success(data.message || "Password reset successful, please log in");
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      toast.error("Something went wrong, please try again");
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
      {done ? (
        <>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f9f2]">
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
            Password updated
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[#5b6779]">
            Your password has been reset. Taking you to log in...
          </p>
        </>
      ) : (
        <>
          <h2 className="text-[26px] font-extrabold tracking-tight text-[#10192b]">
            Create a new password
          </h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[#5b6779]">
            Choose a new password for{" "}
            <span className="font-semibold text-[#10192b]">
              {email || "your account"}
            </span>
            .
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="reset-password"
                className="mb-1.5 block text-[13.5px] font-medium text-[#374357]"
              >
                New password
              </label>
              <div className="relative flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
                >
                  <rect x="4" y="10.5" width="16" height="9.5" rx="2" />
                  <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
                </svg>
                <input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: "" }));
                  }}
                  onBlur={() =>
                    setErrors((p) => ({
                      ...p,
                      password: validatePassword(password),
                    }))
                  }
                  aria-invalid={!!errors.password}
                  className={`w-full rounded-[14px] border-[1.5px] bg-[#f7f9fc] py-3 pl-10 pr-11 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)] ${
                    errors.password
                      ? "border-[#ef4444]"
                      : "border-[#e7ecf3] focus:border-[#1aa6e0]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 text-[#9aa7bb]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-[18px] w-[18px]"
                  >
                    {showPassword ? (
                      <path
                        d="M3 3l18 18M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5M6.5 6.7C4.3 8.1 2.7 10 2 12c1.5 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.1M9.9 4.2A10.4 10.4 0 0 1 12 4c4.5 0 8.5 3 10 7-.6 1.6-1.6 3-2.8 4.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <>
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-[13px] text-[#ef4444]">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reset-confirm-password"
                className="mb-1.5 block text-[13.5px] font-medium text-[#374357]"
              >
                Confirm new password
              </label>
              <div className="relative flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
                >
                  <rect x="4" y="10.5" width="16" height="9.5" rx="2" />
                  <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
                </svg>
                <input
                  id="reset-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((p) => ({ ...p, confirmPassword: "" }));
                  }}
                  onBlur={() =>
                    setErrors((p) => ({
                      ...p,
                      confirmPassword: validateConfirm(
                        confirmPassword,
                        password,
                      ),
                    }))
                  }
                  aria-invalid={!!errors.confirmPassword}
                  className={`w-full rounded-[14px] border-[1.5px] bg-[#f7f9fc] py-3 pl-10 pr-11 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)] ${
                    errors.confirmPassword
                      ? "border-[#ef4444]"
                      : "border-[#e7ecf3] focus:border-[#1aa6e0]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="absolute right-3.5 text-[#9aa7bb]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    className="h-[18px] w-[18px]"
                  >
                    {showConfirm ? (
                      <path
                        d="M3 3l18 18M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5M6.5 6.7C4.3 8.1 2.7 10 2 12c1.5 4 5.5 7 10 7 1.7 0 3.3-.4 4.7-1.1M9.9 4.2A10.4 10.4 0 0 1 12 4c4.5 0 8.5 3 10 7-.6 1.6-1.6 3-2.8 4.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ) : (
                      <>
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-[13px] text-[#ef4444]">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#1aa6e0] to-[#5eead4] py-3.5 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
            >
              {submitting ? "Updating password..." : "Reset password"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-[#5b6779]">
            Remembered your password?{" "}
            <Link href="/login" className="font-semibold text-[#1aa6e0]">
              Back to log in
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
