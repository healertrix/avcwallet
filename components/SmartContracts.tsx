'use client';

import { useState } from 'react';

export default function SmartContracts() {
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');
  const [deployMessage, setDeployMessage] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [action, setAction] = useState('');
  const [params, setParams] = useState('');
  const [executeResult, setExecuteResult] = useState<string | null>(null);

  const handleDeployContract = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/deploy-contract',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ address, code }),
        }
      );
      const data = await response.json();
      setDeployMessage(data.message);
    } catch (error) {
      console.error('Error deploying contract:', error);
      setDeployMessage('Error deploying contract');
    }
  };

  const handleExecuteContract = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/execute-contract',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contractAddress,
            transaction: {
              action,
              params: JSON.parse(params),
            },
          }),
        }
      );
      const data = await response.json();
      setExecuteResult(JSON.stringify(data.result, null, 2));
    } catch (error) {
      console.error('Error executing contract:', error);
      setExecuteResult('Error executing contract');
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Smart Contracts</h2>
      <div className='mb-4'>
        <h3 className='font-semibold'>Deploy Contract</h3>
        <input
          type='text'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Address'
          className='border p-2 mb-2 w-full'
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='Contract Code'
          className='border p-2 mb-2 w-full h-32'
        />
        <button
          onClick={handleDeployContract}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full'
        >
          Deploy Contract
        </button>
        {deployMessage && <p className='mt-2'>{deployMessage}</p>}
      </div>
      <div>
        <h3 className='font-semibold'>Execute Contract</h3>
        <input
          type='text'
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder='Contract Address'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='text'
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder='Action'
          className='border p-2 mb-2 w-full'
        />
        <textarea
          value={params}
          onChange={(e) => setParams(e.target.value)}
          placeholder='Params (JSON format)'
          className='border p-2 mb-2 w-full h-32'
        />
        <button
          onClick={handleExecuteContract}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
        >
          Execute Contract
        </button>
        {executeResult !== null && (
          <div className='mt-2'>
            <h4 className='font-semibold'>Result:</h4>
            <pre>{executeResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
