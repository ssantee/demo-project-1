import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <main className="flex min-h-screen w-full flex-row bg-muted/40">
                <AppSidebar />
                <div className="flex flex-col grow sm:gap-4 sm:py-4 md:pl-0">
                    <main className="flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40 w-auto">
                        <SidebarTrigger />
                        {children}
                    </main>
                </div>
                <Analytics />
            </main>
        </Providers>
    );
}
