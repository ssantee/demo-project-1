import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata = {
    title: 'Demo By Steven Santee',
    description:
        'Two custom tools for generating FizzBuzz and Fibonacci sequences.'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="flex min-h-screen w-full flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
            <Analytics />
        </html>
    );
}
