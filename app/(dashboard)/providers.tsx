'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </TooltipProvider>
  );
}
