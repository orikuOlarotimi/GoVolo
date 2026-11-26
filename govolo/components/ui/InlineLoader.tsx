import { Plane } from "lucide-react";

export default function InlineLoader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3">
      <Plane className="h-10 w-10 animate-bounce text-[rgb(14,168,230)]" />
      <p className="text-sm font-medium text-[rgb(99,111,129)]">Loading…</p>
    </div>
  );
}
