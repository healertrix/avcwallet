'use client';

import { useState } from 'react';

interface CheckBalanceProps {
  publicKey?: string;
  onBalanceCheck?: (balance: number) => void;
}

export default function CheckBalance({
  publicKey,
  onBalanceCheck,
}: CheckBalanceProps) {
  const [address, setAddress] = useState(publicKey || '');
  const [balance, setBalance] = useState<number | null>(null);

  const handleCheckBalance = async () => {
    try {
      const response = await fetch(
        `https://avc-production.up.railway.app/api/balance/${address}`
      );
      const data = await response.json();
      setBalance(data.balance);
      if (onBalanceCheck) {
        onBalanceCheck(data.balance);
      }
    } catch (error) {
      console.error('Error checking balance:', error);
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Check Balance</h2>
      <input
        type='text'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder='Enter wallet address'
        className='w-full p-2 border border-gray-300 rounded'
      />
      <button
        onClick={handleCheckBalance}
        className='mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Check Balance
      </button>
      {balance !== null && (
        <p className='mt-4'>Balance: ${balance.toFixed(2)}</p>
      )}
    </div>
  );
}
