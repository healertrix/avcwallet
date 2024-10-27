'use client';

import { useState } from 'react';

export default function ForgeBlock() {
  const [forgerAddress, setForgerAddress] = useState('');
  const [block, setBlock] = useState(null);

  const handleForgeBlock = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/forge',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ forgerAddress }),
        }
      );
      const data = await response.json();
      setBlock(data.block);
    } catch (error) {
      console.error('Error forging block:', error);
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Forge Block</h2>
      <input
        type='text'
        value={forgerAddress}
        onChange={(e) => setForgerAddress(e.target.value)}
        placeholder='Forger Address'
        className='border p-2 mr-2'
      />
      <button
        onClick={handleForgeBlock}
        className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
      >
        Forge Block
      </button>
      {block && (
        <div className='mt-4'>
          <h3 className='font-semibold'>Forged Block:</h3>
          <pre>{JSON.stringify(block, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
