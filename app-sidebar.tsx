
"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, BarChart3, Database, Settings, PanelLeftClose, PanelLeftOpen, Activity, Lightbulb, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const { toggleSidebar, state } = useSidebar();

  const menuItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/insights", label: "Insights", icon: Lightbulb },
    { href: "/chat", label: "AI Chat", icon: MessageCircle },
    { href: "/data-input", label: "Data Input", icon: Database },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarRail />
      <SidebarContent>
        <SidebarHeader>
           <Button variant="ghost" className="h-10 w-full justify-start px-2 text-xl font-bold" asChild>
              <Link href="/">
                 <Activity />
                 <span className="truncate">ADmyBRAND</span>
              </Link>
           </Button>
        </SidebarHeader>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <item.icon />
                        <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarFooter className="mt-auto">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={toggleSidebar}>
                        {state === 'expanded' ? <PanelLeftClose /> : <PanelLeftOpen />}
                        <span>Collapse</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
