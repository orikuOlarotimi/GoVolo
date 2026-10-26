"use client";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,20}$/;

const labelClass = "block text-sm font-semibold text-[rgb(15,23,41)] mb-2";
const inputClass =
  "w-full p-3 rounded-xl border border-[rgb(225,231,239)] bg-[rgb(248,250,252)] text-[rgb(15,23,41)] focus:border-[rgb(14,168,230)] focus:ring-2 focus:ring-[rgb(14,168,230)]/20 outline-none";

export type GuestDetails = {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

export default function GuestDetailsForm({
  guest,
  onChange,
  submitting,
  completed,
  onBack,
  onSubmit,
}: {
  guest: GuestDetails;
  onChange: (field: keyof GuestDetails, value: string) => void;
  submitting: boolean;
  completed: boolean;
  onBack: () => void;
  onSubmit: (trimmed: GuestDetails) => void;
}) {
  const fullName = guest.fullName.trim();
  const email = guest.email.trim().toLowerCase();
  const phone = guest.phone.trim();
  const specialRequests = guest.specialRequests.trim();

  const canConfirm =
    fullName.length >= 2 &&
    fullName.length <= 100 &&
    EMAIL_REGEX.test(email) &&
    PHONE_REGEX.test(phone) &&
    specialRequests.length <= 500 &&
    !submitting &&
    !completed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canConfirm) return;
    onSubmit({ fullName, email, phone, specialRequests });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            autoComplete="name"
            maxLength={100}
            className={inputClass}
            placeholder="John Doe"
            value={guest.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="john@example.com"
            value={guest.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            autoComplete="tel"
            maxLength={20}
            className={inputClass}
            placeholder="+1 234 567 8900"
            value={guest.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Special Requests (Optional)</label>
          <textarea
            rows={3}
            maxLength={500}
            className={`${inputClass} resize-none`}
            placeholder="Dietary restrictions, room preferences, etc."
            value={guest.specialRequests}
            onChange={(e) => onChange("specialRequests", e.target.value)}
          />
        </div>

        <div>
          <div className="flex gap-3">
            <button
              type="button"
              disabled={submitting || completed}
              onClick={onBack}
              className="flex-1 py-3 rounded-xl border border-[rgb(225,231,239)] text-[rgb(15,23,41)] font-semibold hover:bg-[rgb(242,245,247)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!canConfirm}
              className="flex-1 text-white cursor-pointer bg-[linear-gradient(135deg,rgb(13,165,231),rgb(33,196,93))] px-6 py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {completed
                ? "Booking Created"
                : submitting
                  ? "Confirming…"
                  : "Confirm Booking"}
            </button>
          </div>
          {!canConfirm && !submitting && !completed && (
            <p className="text-xs text-[rgb(99,111,129)] text-center mt-2">
              Enter a valid full name, email, and phone number to continue.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
