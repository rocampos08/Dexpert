'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';

import Link from 'next/link';
import Image from 'next/image';
import { studentRoutes, pymeRoutes } from './AppSidebar.data';
import { useUserRole } from '@/hooks/useUserRole';
import { usePathname } from 'next/navigation';

// Hook para saber si estamos en una pantalla >= 768px (desktop)
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

export function AppSidebar() {
  const { state } = useSidebar(); // 'open' | 'collapsed'
  const { role, isLoading } = useUserRole();
  const pathname = usePathname();
  const isDesktop = useIsDesktop();

  // 👇 Ocultar sidebar COMPLETAMENTE si está colapsado y estamos en escritorio
  if (isDesktop && state === 'collapsed') return null;

  if (isLoading) {
    return (
      <Sidebar collapsible="icon" role="navigation" aria-label="Sidebar loading">
        <SidebarContent className="bg-white">
          <SidebarHeader>
            <div className="flex flex-col items-center justify-center h-screen gap-4">
              <div
                className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                role="status"
                aria-live="polite"
                aria-label="Loading"
              />
              <p className="text-xl font-medium text-gray-700">Loading...</p>
            </div>
          </SidebarHeader>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!role) {
    return (
      <Sidebar collapsible="icon" role="navigation" aria-label="Sidebar sin rol">
        <SidebarContent className="bg-white">
          <SidebarHeader>
            <div className="flex flex-row items-center justify-center py-4">
              <p className="text-gray-500">No hay rol asignado</p>
            </div>
          </SidebarHeader>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" role="navigation" aria-label="Sidebar menu">
      <SidebarContent className="bg-white">
        <SidebarHeader>
          <Link href="/" className="flex flex-row items-center" aria-label="Ir a la página principal">
            {state === 'collapsed' ? (
              <Image
                src="/lgo.png"
                alt="Dexpert icon"
                width={180}
                height={30}
                aria-hidden="true"
              />
            ) : (
              <Image
                src="/lgo.png"
                alt="Dexpert logo"
                width={180}
                height={30}
                priority
              />
            )}
          </Link>
        </SidebarHeader>

        {role === 'STUDENT' && (
          <SidebarGroup aria-label="Menú estudiante">
            <SidebarGroupLabel>Student</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
              {studentRoutes.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuSubButton
                      href={item.url}
                      aria-label={`Ir a ${item.title}`}
                      title={item.title}
                      className={`flex items-center w-full justify-start gap-2 px-3 py-2 rounded-lg transition
                        ${isActive ? 'bg-gray-100 border-l-4 border-[#2196F3] text-[#0A2342]' : ''}
                      `}
                    >
                      <item.icon
                        className={`w-5 h-5 text-[#2196F3]`}
                      />
                      <span>{item.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {role === 'PYME' && (
          <SidebarGroup aria-label="Menú pyme">
            <SidebarGroupLabel>Pyme</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
              {pymeRoutes.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuSubButton
                      href={item.url}
                      aria-label={`Ir a ${item.title}`}
                      title={item.title}
                      className={`flex items-center w-full justify-start gap-2 px-3 py-2 rounded-lg transition
                        ${isActive ? 'bg-gray-100 border-l-4 border-[#0A2342] text-[#0A2342]' : ''}
                      `}
                    >
                      <item.icon
                        className={`w-5 h-5 text-[#0A2342]`}
                      />
                      <span>{item.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
