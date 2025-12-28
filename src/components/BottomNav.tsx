'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/', icon: '🏠', label: 'Beranda' },
    { href: '/flashcard', icon: '📇', label: 'Flashcard' },
    { href: '/kitab', icon: '📖', label: 'Kitab' },
    { href: '/materi', icon: '📚', label: 'Materi' },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0f172a]/95 backdrop-blur-lg border-t border-[#334155] safe-bottom z-50">
            <div className="mobile-container">
                <div className="flex justify-around items-center py-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${isActive
                                        ? 'text-primary bg-primary/10'
                                        : 'text-muted hover:text-white'
                                    }`}
                            >
                                <span className="text-2xl mb-1">{item.icon}</span>
                                <span className="text-xs font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
