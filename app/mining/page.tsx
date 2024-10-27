'use client';

import { useState, useEffect } from 'react';
import DashboardTabs from '../../components/DashboardTabs';
import MineBlock from '../../components/MineBlock';
import ForgeBlock from '../../components/ForgeBlock';

export default function MiningPage() {
  const [publicKey, setPublicKey] = useState<string | null>(null);

  useEffect(() => {
    // Load the wallet from localStorage when the component mounts
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      const { publicKey } = JSON.parse(savedWallet);
      setPublicKey(publicKey);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Mining & Forging</h1>
          <DashboardTabs />
          <div className="mt-8 space-y-8">
            <MineBlock publicKey={publicKey} />
            <ForgeBlock />
          </div>
        </div>
      </main>
    </div>
  );
}
