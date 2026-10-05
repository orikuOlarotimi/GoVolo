type Rating = { average: number; count: number };
type GroupSize = { min: number; max: number };
type RoomType = { name: string; description?: string; price: number };
type TripHighlight = { title: string; description: string };
type ItineraryDay = { day: number; title: string; description?: string };
type AddOn = { name: string; price: number; unit?: string };
type Creator = { _id: string; email: string };

type Destination = {
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
};

type DestinationDetailsCardProps = {
  data: Destination;
};
