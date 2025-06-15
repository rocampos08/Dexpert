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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';

import Link from 'next/link';
import Image from 'next/image';
import { studentRoutes, pymeRoutes } from './AppSidebar.data';
import { useUserRole } from '@/hooks/useUserRole';

export function AppSidebar() {
  const { state } = useSidebar();
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <Sidebar collapsible="icon" role="navigation" aria-label="Sidebar loading">
        <SidebarContent className="bg-white">
          <SidebarHeader>
            <div className="flex flex-row items-center justify-center py-4">
              <div className="flex flex-col items-center justify-center h-screen gap-4">
                <div
                  className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                  role="status"
                  aria-live="polite"
                  aria-label="Loading"
                />
                <p className="text-xl font-medium text-gray-700">Loading...</p>
              </div>
            </div>
          </SidebarHeader>
        </SidebarContent>
      </Sidebar>
    );
  }

  if (!role) {
    return (
      <Sidebar collapsible="icon" role="navigation" aria-label="Sidebar no role">
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
                src="/Dchoto.icon.png"
                alt="Dexpert icon"
                width={40}
                height={40}
                aria-hidden="true"
              />
            ) : (
              <Image
                src="/download.webp"
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
            <SidebarGroupLabel>Estudiante</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
              {studentRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuSubButton  href={item.url}
                      aria-label={`Ir a ${item.title}`}
                      className="flex items-center w-full justify-start" >
                    
                      
                        <div className="p-1 rounded-lg text-white bg-[#2196F3]" aria-hidden="true">
                          <item.icon className="w-4 h-4" />
                        </div>
                      
                      <span>
                        {item.title}
                      </span>
                    
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {role === 'PYME' && (
          <SidebarGroup aria-label="Menú pyme">
            <SidebarGroupLabel>Pyme</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
              <SidebarMenuSub>
                {pymeRoutes.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton href={item.url}
                        aria-label={`Ir a ${item.title}`}
                        className="flex items-center w-full justify-start" >
                      
                        
                          <div className="p-1 rounded-lg text-white bg-[#0A2342]" aria-hidden="true">
                            <item.icon className="w-4 h-4" />
                          </div>
                        
                        <span className={state === 'collapsed' ? 'sr-only' : 'ml-2'}>
                          {item.title}
                        </span>
                    
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
