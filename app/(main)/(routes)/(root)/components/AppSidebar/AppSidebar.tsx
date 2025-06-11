'use client'
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from 'next/link'

import { routes, routesPyme } from './AppSidebar.data'
import Image from 'next/image'

export  function AppSidebar() {
  const {state} = useSidebar()

  return (
    <Sidebar collapsible='icon'>
      <SidebarContent className='bg-white'>
        <SidebarHeader>
          <Link href="/" className='flex flex-row items-center'>
          <Image src="/Dchoto.png" alt='logo Dchoto' width={170} height={170}/>
         {state != "expanded" && <Image src="/Dchoto.icon.png" alt='icono' width={100} height={100}></Image>}
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu className='space-y-2'>
            {routes.map((item)=>(
              <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <div className='p-1 rounded-lg text-white bg-[#2196F3]'>
                        <item.icon className='w-4 h-4'/>
                      </div>
                      {state === "expanded" && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
              
          </SidebarMenu>
          <SidebarGroupLabel>Pyme</SidebarGroupLabel>
          <SidebarMenu className='mt-4'>
            
            <SidebarGroupLabel>
              
              <SidebarMenuItem>
                <SidebarMenuSub>
                  {routesPyme.map((item)=>(
                    <SidebarMenuSubItem key={ item.title}>
                      <SidebarMenuSubButton href={item.url} className='bg-muted transition'>
                          <div className='p-1 rounded-lg text-white bg-[#0A2342]'>
                            <item.icon className='w-4 h-4 '></item.icon>
                          </div>
                          {item.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarGroupLabel>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      
    </Sidebar>
  )
}
