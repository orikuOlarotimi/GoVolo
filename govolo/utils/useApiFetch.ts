// hooks/useApiFetch.ts
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { apiFetch, type ApiFetchOptions } from "./apiClient";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useApiFetch() {
  const { accessToken, setAccessToken, logout } = useAuth();
  const router = useRouter();

  const refreshAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) return null;

      const data = await res.json();
      if (!data.success || !data.accessToken) return null;

      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      return null;
    }
  }, [setAccessToken]);

  const onSessionExpired = useCallback(() => {
    // logout() clears the accessToken from localStorage (via context) AND
    // calls the backend /logout endpoint, which clears the httpOnly refreshToken
    // cookie server-side — client JS cannot clear an httpOnly cookie directly.
    logout();
    router.push("/login");
  }, [logout, router]);

  return useCallback(
    <T = unknown>(path: string, options: ApiFetchOptions = {}) => {
      return apiFetch<T>(path, options, {
        getAccessToken: () => accessToken,
        refreshAccessToken,
        onSessionExpired,
      });
    },
    [accessToken, refreshAccessToken, onSessionExpired],
  );
}
