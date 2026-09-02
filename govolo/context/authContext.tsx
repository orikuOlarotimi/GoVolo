// context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import type { User, AuthContextType } from "../types/auth";
import { apiFetch } from "../utils/apiClient";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = "accessToken";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Ref mirrors accessToken so getAccessToken() always reads the latest
  // value even when called asynchronously (e.g. mid-retry inside apiFetch).
  const accessTokenRef = useRef<string | null>(null);

  const setAccessToken = useCallback((token: string | null) => {
    accessTokenRef.current = token;
    setAccessTokenState(token);
    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  }, []);

  // Single call site for /refresh-token, deduped so concurrent 401s
  // (bootstrap, or any other request via useApiFetch) share one in-flight
  // request instead of each hitting the endpoint separately.
  const refreshPromiseRef = useRef<Promise<string | null> | null>(null);

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    if (refreshPromiseRef.current) return refreshPromiseRef.current;

    refreshPromiseRef.current = (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/refresh-token`, {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) return null;

        const data = await res.json();
        if (!data.success || !data.accessToken) return null;

        setAccessToken(data.accessToken);
        return data.accessToken as string;
      } catch {
        return null;
      } finally {
        refreshPromiseRef.current = null;
      }
    })();

    return refreshPromiseRef.current;
  }, [setAccessToken]);

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

  // On mount: just call /me. No separate refresh call up front.
  // apiFetch handles the rest:
  //  - sends /me with whatever token is in localStorage (possibly none)
  //  - on 401, calls refreshAccessToken() once, which stores the new
  //    token via setAccessToken if it succeeds
  //  - retries /me with the new token
  //  - on repeat 401 (or no valid refresh cookie), treat as logged out
  useEffect(() => {
    async function bootstrap() {
      const stored = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (stored) {
        accessTokenRef.current = stored;
        setAccessTokenState(stored); // optimistic; /me will validate it
      }

      try {
        const data = await apiFetch<{ success: boolean; user: User }>(
          "/api/users/me",
          { method: "GET", requiresAuth: true },
          {
            getAccessToken: () => accessTokenRef.current,
            refreshAccessToken,
            onSessionExpired: () => setAccessToken(null),
          },
        );
        setUser(data.success ? data.user : null);
      } catch {
        // ApiError / SessionExpiredError / NetworkError all land here —
        // silently treat as logged out
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, [refreshAccessToken, setAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        logout,
        setAccessToken,
        refreshAccessToken,
      }}
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
