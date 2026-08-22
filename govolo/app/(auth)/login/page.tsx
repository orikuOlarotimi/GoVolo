"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import ScenePanel from "@/components/auth/ScenePanel";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

type AuthMode = "login" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div
      className={`${jakarta.variable} ${inter.variable} font-sans grid min-h-screen grid-cols-1 bg-[#f7f9fc] text-[#10192b] antialiased lg:grid-cols-[1.05fr_1fr]`}
    >
      <ScenePanel />

      <main className="flex items-center justify-center bg-white px-5 py-10 sm:px-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-7 flex justify-end text-[13.5px] text-[#64748b]">
            Need help?{" "}
            <a href="#" className="ml-1 font-semibold text-[#1aa6e0]">
              Contact support
            </a>
          </div>

          <div
            role="tablist"
            aria-label="Authentication mode"
            className="mb-[30px] grid grid-cols-2 gap-1 rounded-full border border-[#e7ecf3] bg-[#f7f9fc] p-1"
          >
            <button
              role="tab"
              aria-selected={mode === "login"}
              onClick={() => setMode("login")}
              className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
                mode === "login"
                  ? "bg-[#10192b] text-white shadow-[0_1px_2px_rgba(16,25,43,0.04),0_12px_30px_-14px_rgba(16,25,43,0.12)]"
                  : "text-[#64748b]"
              }`}
            >
              Log in
            </button>
            <button
              role="tab"
              aria-selected={mode === "signup"}
              onClick={() => setMode("signup")}
              className={`rounded-full py-2.5 text-sm font-semibold transition-colors ${
                mode === "signup"
                  ? "bg-[#10192b] text-white shadow-[0_1px_2px_rgba(16,25,43,0.04),0_12px_30px_-14px_rgba(16,25,43,0.12)]"
                  : "text-[#64748b]"
              }`}
            >
              Sign up
            </button>
          </div>

          {mode === "login" ? (
            <LoginForm onSwitchToSignup={() => setMode("signup")} />
          ) : (
            <SignupForm onSwitchToLogin={() => setMode("login")} />
          )}
        </div>
      </main>
    </div>
  );
}
