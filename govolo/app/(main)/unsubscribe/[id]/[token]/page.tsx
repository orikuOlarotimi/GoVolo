"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, MailX } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Status = "idle" | "submitting" | "success" | "error";

export default function UnsubscribePage() {
  const { id, token } = useParams<{ id: string; token: string }>();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleUnsubscribe = async () => {
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch(
        `${API_URL}/api/newsletter/unsubscribe/${encodeURIComponent(id)}/${encodeURIComponent(token)}`,
        { method: "POST" },
      );
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        setStatus("error");
        setMessage(data?.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message);
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  };

  return (
    <div className="flex-1 bg-[rgb(248,250,252)]">
      <div className="h-24 bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]" />

      <div className="container mx-auto max-w-md px-4 py-12">
        <div className="min-w-0 space-y-5 rounded-2xl border border-[rgb(225,231,239)] bg-white p-6 text-center shadow-sm sm:p-8">
          {status === "success" ? (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h1 className="text-xl font-bold text-[rgb(15,23,41)]">
                Unsubscribed
              </h1>
              <p className="text-sm text-[rgb(99,111,129)]">{message}</p>
              <Link
                href="/"
                className="inline-block rounded-xl bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] px-6 py-3 font-semibold text-white"
              >
                Back to GoVolo
              </Link>
            </>
          ) : (
            <>
              <MailX className="mx-auto h-12 w-12 text-[rgb(99,111,129)]" />
              <h1 className="text-xl font-bold text-[rgb(15,23,41)]">
                Unsubscribe from GoVolo updates?
              </h1>
              <p className="text-sm text-[rgb(99,111,129)]">
                You&apos;ll stop receiving our emails. You can subscribe again
                any time from our website.
              </p>

              {status === "error" && (
                <p role="alert" className="break-words text-sm text-red-500">
                  {message}
                </p>
              )}

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleUnsubscribe}
                  disabled={status === "submitting"}
                  className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting"
                    ? "Unsubscribing…"
                    : status === "error"
                      ? "Try again"
                      : "Unsubscribe"}
                </button>
                <Link
                  href="/"
                  className="rounded-xl border border-[rgb(225,231,239)] px-6 py-3 font-semibold text-[rgb(15,23,41)] hover:bg-[rgb(242,245,247)]"
                >
                  Keep me subscribed
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
