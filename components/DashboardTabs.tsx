'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Wallet', href: '/wallet' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Mining', href: '/mining' },
  { name: 'Smart Contracts', href: '/smartcontracts' },
  { name: 'Explorer', href: '/explorer' },
  { name: 'NFT', href: '/nft' },
];

export default function DashboardTabs() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md rounded-lg overflow-hidden">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-black">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <li key={tab.name} className="flex-1">
              <Link
                href={tab.href}
                className={`inline-block p-4 w-full transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
