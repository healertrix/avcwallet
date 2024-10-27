'use client';

import { useState, useEffect } from 'react';

interface Transaction {
  fromAddress: string | null;
  toAddress: string;
  amount: number;
  timestamp: number;
  signature: string | null;
  fee: number;
}

interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;
  forger: string;
}

export default function BlockchainExplorer() {
  const [blockchain, setBlockchain] = useState<Block[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlockchain();
  }, []);

  const fetchBlockchain = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/blockchain'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch blockchain data');
      }
      const data = await response.json();
      setBlockchain(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching blockchain:', error);
      setError('Failed to fetch blockchain data. Please try again later.');
    }
  };

  return (
    <div className='overflow-auto max-h-[80vh]'>
      <h2 className='text-xl font-semibold mb-4'>Blockchain Explorer</h2>
      {error ? (
        <p className='text-red-500'>{error}</p>
      ) : blockchain ? (
        <div>
          <h3 className='font-semibold mb-2'>Blockchain Data:</h3>
          {blockchain.map((block) => (
            <div key={block.index} className='mb-4 p-4 border rounded'>
              <h4 className='font-semibold'>Block {block.index}</h4>
              <p>Timestamp: {new Date(block.timestamp).toLocaleString()}</p>
              <p>Previous Hash: {block.previousHash}</p>
              <p>Hash: {block.hash}</p>
              <p>Nonce: {block.nonce}</p>
              <p>Forger: {block.forger}</p>
              <h5 className='font-semibold mt-2'>Transactions:</h5>
              <ul>
                {block.transactions.map((tx, txIndex) => (
                  <li key={txIndex} className='mb-2'>
                    <p>From: {tx.fromAddress || 'Coinbase'}</p>
                    <p>To: {tx.toAddress}</p>
                    <p>Amount: {tx.amount}</p>
                    <p>Fee: {tx.fee}</p>
                    <p>Timestamp: {new Date(tx.timestamp).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading blockchain data...</p>
      )}
    </div>
  );
}
