// context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import type { User, AuthContextType } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = "accessToken";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Keep localStorage in sync whenever accessToken changes
  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }, []);

  // Fetches the full user object using whatever access token is currently valid
  const fetchUser = useCallback(async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return null;

      const data = await res.json();
      return data.success ? (data.user as User) : null;
    } catch {
      return null;
    }
  }, []);

  const login = useCallback(
    (userData: User, token: string) => {
      setUser(userData);
      setAccessToken(token);
    },
    [setAccessToken],
  );

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include", // sends the httpOnly refreshToken cookie so backend can clear it server-side
      });
    } catch {
      // even if this fails (network issue, etc.), still clear client-side state below
    }
    setUser(null);
    setAccessToken(null);
  }, [setAccessToken]);

  // On first mount: attempt a silent refresh using the httpOnly cookie,
  // then hydrate the full user object using the freshly issued access token.
  useEffect(() => {
    async function bootstrap() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/refresh-token`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (!data.success || !data.accessToken) {
          setLoading(false);
          return;
        }

        setAccessToken(data.accessToken);

        const userData = await fetchUser(data.accessToken);
        if (userData) {
          setUser(userData);
        } else {
          // token refresh worked but user fetch failed — treat as logged out
          // rather than leaving a dangling accessToken with no user attached
          setAccessToken(null);
        }
      } catch {
        // silent fail — user is simply treated as logged out
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, [setAccessToken, fetchUser]);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, logout, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
