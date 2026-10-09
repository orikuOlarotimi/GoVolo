export type Rating = { average: number; count: number };
export type GroupSize = { min: number; max: number };
export type RoomType = { name: string; description?: string; price: number };
export type TripHighlight = { title: string; description: string };
export type ItineraryDay = { day: number; title: string; description?: string };
export type AddOn = { name: string; price: number; unit?: string };
export type Creator = {
  fullName?: string;
  lastName?: string;
};
export type ReviewUser = {
  firstName: string;
  lastName: string;
};
export type Review = {
  _id: string;
  rating: number;
  comment: string;
  user: ReviewUser | null; // null if the user account was deleted
  createdAt: string;
};

export type Destination = {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  mainImage: string;
  images?: string[];
  duration?: string;
  groupSize?: GroupSize;
  rating: Rating;
  included: string[];
  notIncluded: string[];
  amenities: string[];
  roomTypes: RoomType[];
  tripHighlights: TripHighlight[];
  itinerary: ItineraryDay[];
  addOns: AddOn[];
  createdBy?: Creator;
  visits: number;
  isPublished: boolean;
};

export type DestinationDetailsCardProps = {
  data: Destination;
  reviews: Review[];
};
