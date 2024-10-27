'use client';

import { useState, useEffect } from 'react';

interface Wallet {
  publicKey: string;
  privateKey: string;
}

export default function CreateWallet() {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    // Fetch the wallet from the backend when the component mounts
    const fetchWallet = async () => {
      try {
        const response = await fetch(
          'https://avc-production.up.railway.app/api/get-wallet'
        );
        if (response.ok) {
          const data: Wallet = await response.json();
          setWallet(data);
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };

    fetchWallet();
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
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  const handleDeleteWallet = async () => {
    try {
      await fetch('https://avc-production.up.railway.app/api/delete-wallet', {
        method: 'DELETE',
      });
      setWallet(null);
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Wallet</h2>
      {wallet ? (
        <div>
          <p>Public Key: {wallet.publicKey}</p>
          <p>Private Key: {wallet.privateKey}</p>
          <button
            onClick={handleDeleteWallet}
            className='mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Delete Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleCreateWallet}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create New Wallet
        </button>
      )}
    </div>
  );
}
