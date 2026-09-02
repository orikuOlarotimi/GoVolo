// hooks/useApiFetch.ts
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
import { apiFetch, type ApiFetchOptions } from "./apiClient";

export function useApiFetch() {
  const { accessToken, refreshAccessToken, logout } = useAuth();
  const router = useRouter();

  const onSessionExpired = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  return useCallback(
    <T = unknown>(path: string, options: ApiFetchOptions = {}) => {
      return apiFetch<T>(path, options, {
        getAccessToken: () => accessToken,
        refreshAccessToken, // same instance as AuthContext — no duplicate refresh logic, no race
        onSessionExpired,
      });
    },
    [accessToken, refreshAccessToken, onSessionExpired],
  );
}
