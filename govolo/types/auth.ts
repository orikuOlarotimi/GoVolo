// types/auth.ts
export type User = {
  firstName: string;
  lastName: string;
  email: string;
  status: "pending" | "verified";
  gender: string;
  country: string;
  city: string;
  dob: string;
  avatar: string | null;
};

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  loading: boolean; // true while the initial silent-refresh check is in flight
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
};
