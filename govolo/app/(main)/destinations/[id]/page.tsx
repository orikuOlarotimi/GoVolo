  import DestinationDetails from "@/components/ui/destinationDetails";

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  type Props = {
    params: Promise<{ id: string }>;
  };

  async function getDestination(id: string) {
    try {
      const res = await fetch(`${API_URL}/api/destinations/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) return { success: false };
      return await res.json();
    } catch {
      return { success: false };
    }
  }

  export default async function DestinationDetailPage({ params }: Props) {
    const { id } = await params;
    const data = await getDestination(id);


    return (
      <div>
        <DestinationDetails id={id} initialData={data} />
      </div>
    );
  }
