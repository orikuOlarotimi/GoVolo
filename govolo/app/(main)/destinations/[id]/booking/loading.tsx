import LoadingBar from "@/components/ui/loadingBar";

export default function Loading() {
  return (
    <div className="bg-[rgb(248,250,252)] min-h-[60vh]">
      <LoadingBar />
      <p className="text-center text-sm text-[rgb(99,111,129)] py-40">
        Loading your booking details…
      </p>
    </div>
  );
}
