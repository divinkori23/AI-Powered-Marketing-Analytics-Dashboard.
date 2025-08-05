
"use client";

import { Activity } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { PanelLeftOpen } from 'lucide-react';

export function Header() {
  const { toggleSidebar, state } = useSidebar();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Button size="icon" variant="outline" className="md:hidden" onClick={toggleSidebar}>
          <PanelLeftOpen />
          <span className="sr-only">Toggle Menu</span>
        </Button>
       <div className="flex items-center gap-2">
         <Activity className="h-6 w-6 text-primary" />
         <h1 className="text-xl font-bold tracking-tight">ADmyBRAND Insights</h1>
       </div>
       <div className="ml-auto flex items-center gap-4">
        <ThemeToggle />
       </div>
    </header>
  )
}
