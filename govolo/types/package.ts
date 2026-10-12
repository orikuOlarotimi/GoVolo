export type PackageDestination = {
  _id: string;
  title: string;
  location: string;
  mainImage: string;
  rating: { average: number; count: number };
  description?: string;
};

export type PackageAddOn = {
  name: string;
  price: number;
  unit?: string;
};

export type Package = {
  _id: string;
  destination: PackageDestination | null; // null if the destination was deleted
  price: number;
  duration: string;
  groupSize: { min: number; max: number };
  included: string[];
  addOns: PackageAddOn[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
};
