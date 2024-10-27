'use client';

import Navbar from '@/components/Navbar';
import {
  ArrowRight,
  Wallet,
  Send,
  Cpu,
  Code,
  Coins,
  Image,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50'>
     
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-16 md:py-24 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
            Revolutionize Your Crypto Experience
          </h1>
          <p className='text-xl text-gray-700 mb-8 max-w-3xl mx-auto'>
            Abhivav Coin (AVC) - The cutting-edge platform for trading,
            managing, and growing your digital assets.
          </p>
          <Link
            href='/wallet'
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition duration-300'
          >
            Get started
            <ArrowRight className='ml-2' size={20} />
          </Link>
        </div>

        <div className='py-16'>
          <h2 className='text-3xl font-bold text-center mb-12 text-gray-800'>
            SimpleCoin Features
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <FeatureCard
              icon={<Wallet size={32} />}
              title='Wallet Management'
              description='Create wallets, check balances, and manage your digital assets with ease.'
            />
            <FeatureCard
              icon={<Send size={32} />}
              title='Transactions'
              description='Send and receive transactions securely on the SimpleCoin network.'
            />
            <FeatureCard
              icon={<Cpu size={32} />}
              title='Mining & Forging'
              description='Participate in block creation through mining (PoW) or forging (PoS).'
            />
            <FeatureCard
              icon={<Code size={32} />}
              title='Smart Contracts'
              description='Deploy and execute smart contracts on the SimpleCoin blockchain.'
            />
            <FeatureCard
              icon={<Coins size={32} />}
              title='Blockchain Explorer'
              description='View and analyze the entire blockchain data for transparency.'
            />
            <FeatureCard
              icon={<Image size={32} />}
              title='NFT Support'
              description='Mint, transfer, and manage Non-Fungible Tokens (NFTs) on SimpleCoin.'
            />
          </div>
        </div>
      </main>
      <footer className='bg-blue-600 py-8 mt-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <p className='text-center text-white'>
            © 2024 Abhivav Coin. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300'>
      <div className='text-blue-600 mb-4'>{icon}</div>
      <h3 className='text-xl font-semibold mb-2 text-gray-800'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}
