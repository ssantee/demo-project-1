import './globals.css';

import { Analytics } from '@vercel/analytics/react';

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
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
