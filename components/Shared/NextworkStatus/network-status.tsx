// components/network-status.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Verificar estado inicial
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      router.push('/offline');
    } else {
      // Si vuelve online y está en la página offline, redirigir a home
      if (window.location.pathname === '/offline') {
        router.push('/');
      }
    }
  }, [isOnline, router]);

  return null;
}