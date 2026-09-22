import DestinationsPageClient from "@/components/ui/DestinationsPageClient";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getDestinations() {
  try {
    const res = await fetch(`${API_URL}/api/destinations`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch {
    return { success: false };
  }
}

export default async function DestinationsPage() {
  const data = await getDestinations();
  return <DestinationsPageClient data={data} />;
}
