'use client';

import { useState } from 'react';

interface MineBlockProps {
  publicKey: string | null;
}

export default function MineBlock({ publicKey }: MineBlockProps) {
  const [block, setBlock] = useState(null);

  const handleMineBlock = async () => {
    if (!publicKey) {
      alert('Please create a wallet first.');
      return;
    }

    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/mine',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ minerAddress: publicKey }),
        }
      );
      const data = await response.json();
      setBlock(data.block);
    } catch (error) {
      console.error('Error mining block:', error);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Mine Block</h2>
      {publicKey ? (
        <div className='mb-4'>
          <p className='text-sm font-medium text-gray-600'>
            Miner Address (Your Public Key):
          </p>
          <p className='text-sm font-mono break-all bg-gray-100 p-2 rounded'>
            {publicKey}
          </p>
        </div>
      ) : (
        <p className='text-red-500 mb-4'>
          Please create a wallet to mine blocks.
        </p>
      )}
      <button
        onClick={handleMineBlock}
        className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300'
        disabled={!publicKey}
      >
        Mine Block
      </button>
      {block && (
        <div className='mt-4'>
          <h3 className='font-semibold mb-2'>Mined Block:</h3>
          <pre className='bg-gray-100 p-4 rounded overflow-x-auto'>
            {JSON.stringify(block, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
