'use client';

import { useEffect } from 'react';
import DashboardTabs from '../../components/DashboardTabs';
import SmartContracts from '../../components/SmartContracts';

export default function SmartContractsPage() {
  useEffect(() => {
    console.log('Smart Contracts page loaded');
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Smart Contracts</h1>
          <DashboardTabs />
          <div className="mt-8">
            <SmartContracts />
          </div>
        </div>
      </main>
    </div>
  );
}
