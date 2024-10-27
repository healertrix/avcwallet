'use client';

import { useState, useEffect } from 'react';
import FriendsManager from './FriendsManager';

export default function SendTransaction() {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const walletData = localStorage.getItem('wallet');
    if (walletData) {
      const { publicKey, privateKey } = JSON.parse(walletData);
      setFromAddress(publicKey);
      setPrivateKey(privateKey);
    }
  }, []);

  const handleSendTransaction = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/transaction',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fromAddress,
            toAddress,
            amount: parseFloat(amount),
            fee: parseFloat(fee),
            privateKey,
          }),
        }
      );
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error sending transaction:', error);
      setMessage('Error sending transaction');
    }
  };

  const selectFriend = (publicKey: string) => {
    setToAddress(publicKey);
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Send Transaction</h2>
      <input
        type='text'
        value={fromAddress}
        onChange={(e) => setFromAddress(e.target.value)}
        placeholder='From Address'
        className='border p-2 mb-2 w-full'
        readOnly
      />
      <input
        type='text'
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder='To Address'
        className='border p-2 mb-2 w-full'
      />
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='Amount'
        className='border p-2 mb-2 w-full'
      />
      <input
        type='number'
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        placeholder='Fee'
        className='border p-2 mb-2 w-full'
      />
      <input
        type='password'
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder='Private Key'
        className='border p-2 mb-2 w-full'
        readOnly
      />
      <button
        onClick={handleSendTransaction}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
      >
        Send Transaction
      </button>
      {message && <p className='mt-4'>{message}</p>}
      <FriendsManager onSelectFriend={selectFriend} />
    </div>
  );
}
