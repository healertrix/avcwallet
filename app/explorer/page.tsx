'use client';

import { useState, useEffect } from 'react';
import DashboardTabs from '../../components/DashboardTabs';

interface NFTData {
  tokenId: string;
  metadata: {
    name: string;
    description: string;
  };
}

interface Transaction {
  fromAddress: string | null;
  toAddress: string;
  amount: number;
  timestamp: number;
  signature: string | null;
  fee: number;
  type: string;
  nftData?: NFTData;
}

interface Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  nonce: number;
  hash: string;
  previousHash: string;
}

export default function ExplorerPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    fetch('https://avc-production.up.railway.app/api/blockchain')
      .then((response) => response.json())
      .then((data) => setBlocks(data.reverse()))
      .catch((error) =>
        console.error('Error fetching blockchain data:', error)
      );
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 text-black'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-12'>
          <h1 className='text-4xl font-bold text-black mb-6'>
            Blockchain Explorer
          </h1>
          <DashboardTabs />
          <div className='mt-8'>
            {blocks.map((block, index) => (
              <BlockCard
                key={block.hash}
                block={block}
                isLatest={index === 0}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function BlockCard({ block, isLatest }: { block: Block; isLatest: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 mb-4 ${
        isLatest ? 'border-2 border-blue-500' : ''
      }`}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Block #{block.index}
        </h2>
        {isLatest && (
          <span className='bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
            Latest Block
          </span>
        )}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className='text-sm font-medium text-gray-500'>Timestamp</p>
          <p className='text-lg text-gray-800'>
            {new Date(block.timestamp).toLocaleString()}
          </p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Transactions</p>
          <p className='text-lg text-gray-800'>{block.transactions.length}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Nonce</p>
          <p className='text-lg text-gray-800'>{block.nonce}</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Hash</p>
          <p className='text-sm text-gray-800 break-all'>{block.hash}</p>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-sm font-medium text-gray-500'>Previous Hash</p>
        <p className='text-sm text-gray-800 break-all'>{block.previousHash}</p>
      </div>
      <button
        className='mt-4 text-blue-600 hover:text-blue-800'
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide' : 'Show'} Transactions
      </button>
      {expanded && (
        <div className='mt-4'>
          <h3 className='text-xl font-semibold mb-2'>Transactions</h3>
          {block.transactions.map((tx, index) => (
            <TransactionCard key={index} transaction={tx} />
          ))}
        </div>
      )}
    </div>
  );
}

function TransactionCard({ transaction }: { transaction: Transaction }) {
  const isNFT = transaction.type === 'mintNFT';

  return (
    <div className='bg-gray-100 rounded-lg p-4 mb-2'>
      <div className='flex justify-between items-center mb-2'>
        <p className='text-sm font-medium text-gray-500'>Transaction Type</p>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isNFT
              ? 'bg-purple-200 text-purple-800'
              : 'bg-blue-200 text-blue-800'
          }`}
        >
          {isNFT ? 'NFT Minting' : 'Regular Transaction'}
        </span>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        <div>
          <p className='text-sm font-medium text-gray-500'>From</p>
          <p className='text-sm text-gray-800 break-all'>
            {transaction.fromAddress || 'System (Minting)'}
          </p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>To</p>
          <p className='text-sm text-gray-800 break-all'>
            {transaction.toAddress}
          </p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Amount</p>
          <p className='text-sm text-gray-800'>{transaction.amount} AVC</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Fee</p>
          <p className='text-sm text-gray-800'>{transaction.fee} AVC</p>
        </div>
        <div>
          <p className='text-sm font-medium text-gray-500'>Timestamp</p>
          <p className='text-sm text-gray-800'>
            {new Date(transaction.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      {isNFT && transaction.nftData && (
        <div className='mt-4 bg-white rounded p-4'>
          <p className='text-sm font-medium text-purple-600 mb-2'>NFT Data</p>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <p className='text-sm font-medium text-gray-500'>Token ID</p>
              <p className='text-sm text-gray-800 break-all'>
                {transaction.nftData.tokenId}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium text-gray-500'>Name</p>
              <p className='text-sm text-gray-800'>
                {transaction.nftData.metadata.name}
              </p>
            </div>
            <div className='col-span-2'>
              <p className='text-sm font-medium text-gray-500'>Description</p>
              <p className='text-sm text-gray-800'>
                {transaction.nftData.metadata.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
