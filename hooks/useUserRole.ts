"use client";

import { useUser } from "@clerk/nextjs";
import useSWR from "swr";

export function useUserRole() {
  const { user, isLoaded } = useUser(); // Agregado: isLoaded

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    isLoaded && user ? "/api/get-role" : null, // Usar isLoaded también
    fetcher
  );

  return {
    role: data?.role,
    isLoading: !isLoaded || isLoading, // Hasta que Clerk esté listo
    error,
  };
}
