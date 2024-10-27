'use client';

import DashboardTabs from '../../components/DashboardTabs';
import NFTManager from '../../components/NFTManager';

export default function NFTPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-black mb-6">NFT Management</h1>
          <DashboardTabs />
          <div className="mt-8">
            <NFTManager />
          </div>
        </div>
      </main>
    </div>
  );
}
