const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const PAGE_SIZE = 9;

export type PackageItem = {
  _id: string;
  price: number;
  duration?: string;
  groupSize?: { min?: number; max?: number };
  rating?: { average?: number; count?: number };
  included?: string[];
  destination?: {
    title: string;
    location: string;
    mainImage?: string;
  } | null;
};

export type PackagesResponse = {
  success: boolean;
  page: number;
  totalPages: number;
  total: number;
  count: number;
  packages: PackageItem[];
};

// Throws on any failure, so callers only need one try/catch
export async function fetchPackages(
  page: number,
  limit: number,
): Promise<PackagesResponse> {
  const res = await fetch(
    `${API_URL}/api/packages?page=${page}&limit=${limit}`,
    { cache: "no-store" },
  );
  const json: PackagesResponse = await res.json();

  if (!res.ok || !json.success) {
    throw new Error("Unsuccessful response");
  }
  return json;
}
