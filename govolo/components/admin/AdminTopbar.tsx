"use client";

export default function AdminTopbar() {
  return (
    <header className="h-16 flex items-center justify-end px-6 bg-white border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[rgb(13,162,231)]/10 flex items-center justify-center text-[rgb(13,162,231)] font-semibold text-sm">
          {/* placeholder initial — wire to real admin name once AuthContext is read here */}
          A
        </div>

      </div>
    </header>
  );
}
