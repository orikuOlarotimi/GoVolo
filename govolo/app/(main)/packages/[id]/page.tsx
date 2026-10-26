import PackageBookingDetails from "@/components/packages/PackageBookingDetails";
import type { PackageApiResponse } from "@/components/packages/PackageBookingDetails";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function PackageBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let initialData: PackageApiResponse = { success: false };
  try {
    const res = await fetch(
      `${API_URL}/api/packages/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );
    const json: PackageApiResponse = await res.json();
    if (res.ok && json.success && json.package) initialData = json;
  } catch {
    // leave initialData as a failure; the client component shows the error state
  }

  return <PackageBookingDetails initialData={initialData} />;
}
