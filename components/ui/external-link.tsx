import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link target="_blank"
            href={href}
            className='text-blue-500 hover:text-blue-700 underline'
            rel="noopener noreferrer"
        >
            {children}
            <SquareArrowOutUpRight className='inline w-3 h-3' />
        </Link>
    );
}