"use client";

import { useMemo, useState } from "react";

export default function SignupForm({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");


  const strengthScore = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password) || /[A-Z]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#14b8a6"];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to your actual auth endpoint (e.g. POST /api/auth/signup)
    console.log("signup form submitted");
  }

  return (
    <section className="animate-[fade-in_0.35s_ease]">
      <div>
        <h1 className="font-[Plus_Jakarta_Sans,sans-serif] text-[26px] font-extrabold tracking-[-0.02em]">
          Start your journey
        </h1>
        <p className="mt-2 text-[14.5px] leading-[1.5] text-[#64748b]">
          Create a free account to save trips and unlock member pricing.
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
        or sign up with email
      </div>

      <div className="w-full ">
      <form onSubmit={handleSubmit}>
        {/* First name / Last name */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="signup-firstName"
              className="mb-[7px] block text-[13px] font-semibold text-[#10192b]"
            >
              First name
            </label>
            <div className="relative flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20c1.4-3.6 4-5.4 7.5-5.4s6.1 1.8 7.5 5.4" />
              </svg>
              <input
                id="signup-firstName"
                type="text"
                placeholder="Ada"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
              />
            </div>
          </div>
 
          <div>
            <label
              htmlFor="signup-lastName"
              className="mb-[7px] block text-[13px] font-semibold text-[#10192b]"
            >
              Last name
            </label>
            <div className="relative flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20c1.4-3.6 4-5.4 7.5-5.4s6.1 1.8 7.5 5.4" />
              </svg>
              <input
                id="signup-lastName"
                type="text"
                placeholder="Obi"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
              />
            </div>
          </div>
        </div>
 
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="signup-email"
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
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
            />
          </div>
        </div>
 
        {/* City / Country */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="signup-city"
              className="mb-[7px] block text-[13px] font-semibold text-[#10192b]"
            >
              City
            </label>
            <div className="relative flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
              >
                <path d="M4 20V9l6-3.5V20" />
                <path d="M10 20V5.5L20 9v11" />
                <path d="M7 12h0M7 15h0M13 12h2M13 15h2" />
              </svg>
              <input
                id="signup-city"
                type="text"
                placeholder="Ibadan"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
              />
            </div>
          </div>
 
          <div>
            <label
              htmlFor="signup-country"
              className="mb-[7px] block text-[13px] font-semibold text-[#10192b]"
            >
              Country
            </label>
            <div className="relative flex items-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
              >
                <circle cx="12" cy="12" r="8.5" />
                <path d="M3.5 12h17M12 3.5c2.4 2.3 3.7 5.2 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.2-3.7-8.5S9.6 5.8 12 3.5Z" />
              </svg>
              <input
                id="signup-country"
                type="text"
                placeholder="Nigeria"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
              />
            </div>
          </div>
        </div>
 
        {/* Gender */}
        <div className="mb-4">
          <span className="mb-[7px] block text-[13px] font-semibold text-[#10192b]">
            Gender
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender("male")}
              aria-pressed={gender === "male"}
              className={`rounded-[14px] border-[1.5px] py-3 text-[14.5px] font-semibold transition-all ${
                gender === "male"
                  ? "border-[#1aa6e0] bg-white text-[#10192b] shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
                  : "border-[#e7ecf3] bg-[#f7f9fc] text-[#5b6577] hover:border-[#cfd8e6]"
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              aria-pressed={gender === "female"}
              className={`rounded-[14px] border-[1.5px] py-3 text-[14.5px] font-semibold transition-all ${
                gender === "female"
                  ? "border-[#1aa6e0] bg-white text-[#10192b] shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
                  : "border-[#e7ecf3] bg-[#f7f9fc] text-[#5b6577] hover:border-[#cfd8e6]"
              }`}
            >
              Female
            </button>
          </div>
          {/* Hidden input keeps gender part of native form validation/submission */}
          <input type="hidden" name="gender" value={gender} required />
        </div>
 
        {/* Date of birth */}
        <div className="mb-4">
          <label
            htmlFor="signup-dob"
            className="mb-[7px] block text-[13px] font-semibold text-[#10192b]"
          >
            Date of birth
          </label>
          <div className="relative flex items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="pointer-events-none absolute left-3.5 h-[17px] w-[17px] text-[#9aa7bb]"
            >
              <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
              <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
            </svg>
            <input
              id="signup-dob"
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-[14px] border-[1.5px] border-[#e7ecf3] bg-[#f7f9fc] py-3 pl-10 pr-3.5 text-[14.5px] text-[#10192b] outline-none transition-all placeholder:text-[#a5b0c2] focus:border-[#1aa6e0] focus:bg-white focus:shadow-[0_0_0_4px_rgba(26,166,224,0.12)]"
            />
          </div>
        </div>
 
        {/* Password */}
        <div className="mb-4">
          <label
            htmlFor="signup-password"
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
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
 
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1aa6e0] to-[#14b8a6] px-4 py-[13.5px] text-[15px] font-bold text-white shadow-[0_14px_24px_-12px_rgba(20,184,166,0.55)] transition-all hover:-translate-y-px hover:shadow-[0_18px_28px_-12px_rgba(20,184,166,0.65)] active:translate-y-0 [&:hover_svg]:translate-x-1"
        >
          Create account
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
        </div>

      <p className="mt-[18px] text-center text-xs leading-[1.6] text-[#a5b0c2]">
        By continuing, you agree to Travelix&apos;s{" "}
        <a href="#" className="underline underline-offset-2 text-[#7c8aa0]">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-2 text-[#7c8aa0]">
          Privacy Policy
        </a>
        .
      </p>

      <p className="mt-6 text-center text-[13.5px] text-[#64748b]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-bold text-[#1aa6e0]"
        >
          Log in
        </button>
      </p>
    </section>
  );
}