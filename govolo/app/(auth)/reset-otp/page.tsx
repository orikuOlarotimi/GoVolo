"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthShell from "../../../components/auth/AuthShell";
import { toast } from "sonner";

const RESEND_SECONDS = 60;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // digits only, one char

    const next = [...digits];
    next[index] = value;
    setDigits(next);
   

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasted)) return;
    e.preventDefault();
    setDigits(pasted.split(""));
    inputsRef.current[5]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = digits.join("");

    if (otp.length !== 6) {
      toast.error("Enter the full 6-digit code");
      return;
    }
    if (!email) {
      toast.error("Missing email address, please sign up again");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/verify-reset-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Invalid or expired code");
        setSubmitting(false);
        return;
      }
      toast.success(data.message || "Account verified successfully\n Please change your password");
      router.push("/reset-password");
    } catch {
      toast.error("Something went wrong, please try again");
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || resending) return;
    if (!email) {
      toast.error("Missing email address, please sign up again");
      return;
    }

    setResending(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/resend-reset-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Could not resend code");
        setResending(false);
        return;
      }
      toast.success("A new code has been sent to your email");
      setResendCooldown(RESEND_SECONDS);
      setDigits(Array(6).fill(""));
      inputsRef.current[0]?.focus();
    } catch {
      toast.error("Something went wrong, please try again");
    } finally {
      setResending(false);
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
      <h2 className="text-[26px] font-extrabold tracking-tight text-[#10192b]">
        Verify your email
      </h2>
      <p className="mt-2 text-[14.5px] leading-relaxed text-[#5b6779]">
        We've sent a 6-digit code to{" "}
        <span className="font-semibold text-[#10192b]">
          {email || "your email address"}
        </span>
        . Enter it below to confirm your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex items-center justify-between gap-2.5">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              aria-label={`Digit ${index + 1}`}
            
              className="h-14 w-full rounded-[14px] border-[1.5px] bg-[#f7f9fc] text-center text-[20px] font-bold text-[#10192b] outline-none transition-all focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]
                  border-[#e7ecf3] focus:border-[#1aa6e0]"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#1aa6e0] to-[#5eead4] py-3.5 text-[15px] font-semibold text-white transition-opacity disabled:opacity-60"
        >
          {submitting ? "Verifying..." : "Verify account"}
        </button>

        <p className="mt-6 text-center text-[13.5px] text-[#5b6779]">
          Didn't get the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || resending}
            className="font-semibold text-[#1aa6e0] disabled:cursor-not-allowed disabled:text-[#a5b0c2] cursor-pointer"
          >
            {resending
              ? "Sending..."
              : resendCooldown > 0
                ? `Resend OTP in 0:${String(resendCooldown).padStart(2, "0")}`
                : "Resend OTP"}
          </button>
        </p>
      </form>
    </AuthShell>
  );
}
