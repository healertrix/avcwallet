'use client';

import { useState, useEffect } from 'react';
import DashboardTabs from '../../components/DashboardTabs';

// Add this interface to define the wallet structure
interface Wallet {
  publicKey: string;
  privateKey: string;
}

export default function WalletPage() {
  // Update the state type to Wallet | null
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    // Load the wallet from localStorage when the component mounts
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  const handleCreateWallet = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/create-wallet',
        {
          method: 'POST',
        }
      );
      const data: Wallet = await response.json();
      setWallet(data);
      // Save the wallet to localStorage
      localStorage.setItem('wallet', JSON.stringify(data));
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  const updateBalance = async (publicKey: string) => {
    try {
      const response = await fetch(
        `https://avc-production.up.railway.app/api/balance/${publicKey}`
      );
      const data = await response.json();
      setBalance(data.balance);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error checking balance:', error);
    }
  };

  useEffect(() => {
    if (wallet?.publicKey) {
      updateBalance(wallet.publicKey);
    }
  }, [wallet]);

  return (
    <div className='min-h-screen bg-white text-gray-900'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-12'>
          <h1 className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6'>
            Wallet Dashboard
          </h1>
          <DashboardTabs />
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300'>
              <h2 className='text-3xl font-semibold mb-4'>Current Balance</h2>
              <div className='text-6xl font-bold mb-2'>
                {balance !== null ? `$${balance.toFixed(2)}` : 'N/A'}
              </div>
              <div className='text-sm opacity-80'>
                Last updated: {lastUpdated || 'Never'}
              </div>
            </div>
            <div className='bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700'>
              <h2 className='text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                Quick Actions
              </h2>
              <div className='space-y-6'>
                {wallet ? (
                  <>
                    <div className='bg-gray-900 p-4 rounded-xl'>
                      <p className='text-sm font-medium text-gray-400 mb-1'>
                        Public Key
                      </p>
                      <p className='text-sm font-mono break-all text-green-400'>
                        {wallet.publicKey}
                      </p>
                    </div>
                    <div className='bg-gray-900 p-4 rounded-xl'>
                      <p className='text-sm font-medium text-gray-400 mb-1'>
                        Private Key
                      </p>
                      <p className='text-sm font-mono break-all text-pink-400'>
                        {wallet.privateKey}
                      </p>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleCreateWallet}
                    className='w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center text-lg font-semibold shadow-lg'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6 mr-2'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Create New Wallet
                  </button>
                )}
                <button className='w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 transition duration-300 flex items-center justify-center text-lg font-semibold shadow-lg'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 mr-2'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414-1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z' />
                  </svg>
                  Send / Receive
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
