"use client";

import { useState, useEffect, useRef } from "react";
import BasicsAndMediaStep from "../../../components/admin/destinations/basicsAndMediaStep";
import TripContentStep from "../../../components/admin/destinations/tripContentStep";
import ItineraryStep from "../../../components/admin/destinations/itineraryStep";
import PricingStep from "../../../components/admin/destinations/pricingStep";
import { saveDraft, loadDraft, clearDraft } from "@/lib/draftStorage";
// adjust this import to whatever your actual auth hook is called
import { useAuth } from "@/context/authContext";
import { ApiError } from "../../../utils/apiClient";
import { useApiFetch } from "../../../utils/useApiFetch";

type RoomType = { name: string; description: string; price: number };
type AddOn = { name: string; price: string; unit: string };
type TripHighlight = { title: string; description: string };
type ItineraryDay = { day: number; title: string; description: string };

type DestinationFormData = {
  title: string;
  description: string;
  location: string;
  price: string;
  duration: string;
  groupSizeMin: string;
  groupSizeMax: string;
  mainImage: File | null;
  images: File[];
  tripHighlights: TripHighlight[];
  included: string[];
  notIncluded: string[];
  amenities: string[];
  itinerary: ItineraryDay[];
  roomTypes: RoomType[];
  addOns: AddOn[];
};

const STEPS = ["Basics & Media", "Trip Content", "Itinerary", "Pricing"];

const initialData: DestinationFormData = {
  title: "",
  description: "",
  location: "",
  price: "",
  duration: "",
  groupSizeMin: "",
  groupSizeMax: "",
  mainImage: null,
  images: [],
  tripHighlights: [],
  included: [],
  notIncluded: [],
  amenities: [],
  itinerary: [],
  roomTypes: [{ name: "Standard Room", description: "", price: 0 }],
  addOns: [],
};

export default function PostDestinationForm() {
  const { user, loading: authLoading } = useAuth(); // expects user.email
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DestinationFormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [restoring, setRestoring] = useState(true);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
   const apiFetch = useApiFetch();

  // Load any existing draft once, before rendering the form
 useEffect(() => {
   if (authLoading) return; // wait for auth to resolve first
   if (!user?.email) {
     setRestoring(false);
     return;
   }
   loadDraft<DestinationFormData>(user.email)
     .then((draft) => {
       if (draft) setData(draft);
     })
     .finally(() => setRestoring(false));
 }, [user?.email, authLoading]);

  // Autosave on every change, debounced so we're not writing on every keystroke
  useEffect(() => {
    if (restoring || !user?.email) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveDraft(user.email, data);
    }, 600);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [data, restoring, user?.email]);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

 const handleSubmit = async () => {
   setSubmitting(true);
   try {
     const formData = new FormData();

     formData.append("title", data.title.trim());
     formData.append("description", data.description.trim());
     formData.append("location", data.location.trim());
     formData.append("price", data.price);
     formData.append("duration", data.duration.trim());

     const groupSize = {
       min: data.groupSizeMin ? Number(data.groupSizeMin) : undefined,
       max: data.groupSizeMax ? Number(data.groupSizeMax) : undefined,
     };
     formData.append("groupSize", JSON.stringify(groupSize));

     formData.append("tripHighlights", JSON.stringify(data.tripHighlights));
     formData.append("included", JSON.stringify(data.included));
     formData.append("notIncluded", JSON.stringify(data.notIncluded));
     formData.append("amenities", JSON.stringify(data.amenities));
     formData.append("itinerary", JSON.stringify(data.itinerary));
     formData.append(
       "roomTypes",
       JSON.stringify(
         data.roomTypes.map((r) => ({ ...r, price: Number(r.price) })),
       ),
     );
     formData.append(
       "addOns",
       JSON.stringify(
         data.addOns.map((a) => ({ ...a, price: Number(a.price) })),
       ),
     );

     if (data.mainImage) {
       formData.append("mainImage", data.mainImage);
     }
     data.images.forEach((file) => {
       formData.append("images", file);
     });

     await apiFetch("/api/destinations", {
       method: "POST",
       body: formData,
       requiresAuth: true,
     });

     if (user?.email) await clearDraft(user.email);
     setData(initialData);
     setStep(0);
   } catch (error) {
     if (error instanceof ApiError) {
       console.error("Destination submit failed:", error.message, error.data);
     } else {
       console.error("Destination submit failed:", error);
     }
     // real error UI comes later, per what we agreed
   } finally {
     setSubmitting(false);
   }
 };

  if (authLoading || restoring) {
    return (
      <div className="w-full flex items-center justify-center py-24">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[rgb(13,162,231)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="flex items-center mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  i === step
                    ? "bg-[rgb(13,162,231)] text-white"
                    : i < step
                      ? "bg-[rgb(13,162,231)]/20 text-[rgb(13,162,231)]"
                      : "bg-[rgb(248,250,252)] text-[rgb(101,117,139)] border border-border"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  i === step
                    ? "text-[rgb(15,23,42)]"
                    : "text-[rgb(101,117,139)]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${
                  i < step ? "bg-[rgb(13,162,231)]" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 md:p-8">
        {step === 0 && (
          <BasicsAndMediaStep
            data={data}
            onChange={(updated) => setData({ ...data, ...updated })}
            onNext={goNext}
          />
        )}
        {step === 1 && (
          <TripContentStep
            data={data}
            onChange={(updated) => setData({ ...data, ...updated })}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {step === 2 && (
          <ItineraryStep
            data={data}
            onChange={(updated) => setData({ ...data, ...updated })}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {step === 3 && (
          <PricingStep
            data={data}
            onChange={(updated) => setData({ ...data, ...updated })}
            onSubmit={handleSubmit}
            onBack={goBack}
            submitting={submitting}
          />
        )}
      </div>
    </div>
  );
}
