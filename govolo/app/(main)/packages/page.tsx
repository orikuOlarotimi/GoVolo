import PackagesList from "@/components/packages/PackagesList";
import { fetchPackages, PAGE_SIZE } from "@/lib/packages";
import type { PackagesResponse } from "@/lib/packages";
import { GoGift } from "react-icons/go";

const MAX_RESTORED_PAGES = 10; // caps the limit sent when restoring from ?page=

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const parsed = parseInt(pageParam ?? "1", 10);
  const page =
    Number.isInteger(parsed) && parsed >= 1
      ? Math.min(parsed, MAX_RESTORED_PAGES)
      : 1;

  // ?page=3 means "show pages 1 to 3", so fetch them in one request
  let initialData: PackagesResponse | null = null;
  try {
    initialData = await fetchPackages(1, page * PAGE_SIZE);
  } catch {
    initialData = null; // the client component shows the error state
  }

  return (
    <main className="bg-[rgb(248,250,252)]">
      <div className="relative">
        <div className="py-30 px-4 flex items-center justify-center bg-gradient-to-br from-[rgb(5,15,25)] via-[rgb(8,30,45)] to-[rgb(10,65,90)]">
          <div className="container">
            <div className="flex flex-col items-center">
              <GoGift size={70} className="text-white mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-[rgb(255,255,255)]">
                All Packages
              </h1>
              <div className="h-1 w-20 bg-[rgb(14,164,230)]/50 mx-auto rounded-full mb-4"></div>
            </div>
            <p className="text-[rgb(255,255,255)]/70 text-base mx-[20px] text-center">
              Handpicked packages for unforgettable experiences around the globe
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[rgb(248,250,252)] rounded-t-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl bg-[rgb(248,250,252)]">
        <PackagesList initialData={initialData} initialPage={page} />
      </div>
    </main>
  );
}
