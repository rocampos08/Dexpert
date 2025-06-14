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

  // Show a loading state while the role is being fetched
  if (isLoading) {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent className="bg-white">
          <SidebarHeader>
            <div className="flex flex-row items-center justify-center py-4">
              {/* You can add a spinner or a placeholder for loading */}
              <p className="text-gray-500">Cargando...</p>
            </div>
          </SidebarHeader>
        </SidebarContent>
      </Sidebar>
    );
  }

  // If after loading, there's no role, display "No role assigned"
  if (!role) {
    return (
      <Sidebar collapsible="icon">
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

  // Once role is loaded and present, render the full sidebar
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarHeader>
          <Link href="/" className="flex flex-row items-center">
            <Image src="/Dchoto.png" alt="logo Dchoto" width={170} height={170} />
            {state !== 'expanded' && (
              <Image src="/Dchoto.icon.png" alt="icono" width={100} height={100} />
            )}
          </Link>
        </SidebarHeader>

        {role === 'STUDENT' && (
          <SidebarGroup>
            <SidebarGroupLabel>Student</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
              {studentRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuSubButton asChild>
                    <a href={item.url}>
                      <div className="p-1 rounded-lg text-white bg-[#2196F3]">
                        <item.icon className="w-4 h-4" />
                      </div>
                      {state === 'expanded' && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {role === 'PYME' && (
          <SidebarGroup>
            <SidebarGroupLabel>Pyme</SidebarGroupLabel>
            <SidebarMenu className="space-y-2">
              <SidebarMenuSub>
                {pymeRoutes.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton href={item.url} className="bg-muted transition">
                      <div className="p-1 rounded-lg text-white bg-[#0A2342]">
                        <item.icon className="w-4 h-4" />
                      </div>
                      {item.title}
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