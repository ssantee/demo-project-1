'use client';
import { Home, Variable, SquareFunction } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/ui/theme-toggle';
// Menu items.
const items = [
    {
        title: 'Home',
        url: '/',
        icon: Home
    },
    {
        title: 'FizzBuzz',
        url: '/fizzbuzz',
        icon: Variable
    },
    {
        title: 'Fibonacci',
        url: '/fibonacci',
        icon: SquareFunction
    }
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <ModeToggle />
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={item.url}
                                            data-active={
                                                usePathname() === item.url
                                                    ? 'true'
                                                    : 'false'
                                            }
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
