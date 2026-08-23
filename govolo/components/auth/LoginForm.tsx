"use client";

import { useState } from "react";

export default function LoginForm({
  onSwitchToSignup,
}: {
  onSwitchToSignup: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your actual auth endpoint (e.g. POST /api/auth/login)
    console.log("login form submitted");
  }

  return (
    <section className="animate-[fade-in_0.5s_ease] font-[Plus_Jakarta_Sans,sans-serif] ">
      <div>
        <h1 className="font-[Plus_Jakarta_Sans,sans-serif] text-[26px] font-extrabold tracking-[-0.02em]">
          Welcome back
        </h1>
        <p className="mt-2 text-[14.5px] leading-[1.5] text-[#64748b]">
          Log in to pick up your itinerary right where you left it.
        </p>
      </div>

      {/* social buttons */}
      <div className="my-[26px] grid grid-cols-2 gap-2.5">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-[14px] border border-[#e7ecf3] bg-white px-2.5 py-[11px] text-[13.5px] font-semibold text-[#10192b] transition-all hover:-translate-y-px hover:border-[#c7d2e0]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.6 14.7 2.6 12 2.6 6.9 2.6 2.7 6.8 2.7 12s4.2 9.4 9.3 9.4c5.4 0 9-3.8 9-9.1 0-.6-.1-1.1-.2-1.6H12z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-[14px] border border-[#e7ecf3] bg-white px-2.5 py-[11px] text-[13.5px] font-semibold text-[#10192b] transition-all hover:-translate-y-px hover:border-[#c7d2e0]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path
              fill="#111827"
              d="M16.3 12.6c0-2.4 1.9-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.4-.9-2.4-3.6zM14 5.3c.6-.8 1-1.9.9-3-1 0-2.2.7-2.9 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.2-.6 3-1.4z"
            />
          </svg>
          Apple
        </button>
      </div>

      <div className="my-[22px] flex items-center gap-3 text-xs text-[#64748b] before:h-px before:flex-1 before:bg-[#e7ecf3] after:h-px after:flex-1 after:bg-[#e7ecf3]">
        or continue with email
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="login-email"
            className="mb-[7px] block text-[13px] font-semibold text-[#10192b]"
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
              <path d="M3.5 6.5L12 13L20.5 6.5" />
            </svg>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="login-password"
            className="mb-[7px] block text-[13px] font-semibold text-[#10192b]"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
            >
              <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
              <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
            </svg>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-10 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 flex text-[#9aa7bb]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-[17px] w-[17px]"
              >
                <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="my-1 mb-[22px] flex items-center justify-between text-[13.5px]">
          <label className="flex cursor-pointer select-none items-center gap-2 text-[#64748b]">
            <input type="checkbox" className="h-4 w-4 accent-[#1aa6e0]" />
            Remember me
          </label>
          <a href="#" className="font-semibold text-[#1aa6e0]">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1aa6e0] to-[#14b8a6] px-4 py-[13.5px] text-[15px] font-bold text-white shadow-[0_14px_24px_-12px_rgba(20,184,166,0.55)] transition-all hover:-translate-y-px hover:shadow-[0_18px_28px_-12px_rgba(20,184,166,0.65)] active:translate-y-0 [&:hover_svg]:translate-x-1"
        >
          Log in
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            className="h-4 w-4 transition-transform"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>

      <p className="mt-6 text-center text-[13.5px] text-[#64748b]">
        New to Travelix?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-bold text-[#1aa6e0]"
        >
          Create an account
        </button>
      </p>
    </section>
  );
}
