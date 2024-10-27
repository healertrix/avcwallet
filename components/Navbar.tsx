'use client'; // Add this line at the top of the file

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='bg-blue-600 p-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <Link href='/' className='text-white text-2xl font-bold'>
              Abhivav Coin
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-4'>
            <Link href='/wallet' className='text-white hover:text-blue-200'>
              Wallet
            </Link>
            <Link href='/explorer' className='text-white hover:text-blue-200'>
              Explorer
            </Link>
            <SignedIn>
              <UserButton afterSignOutUrl='/' />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-white hover:text-blue-200">Sign In</button>
              </SignInButton>
            </SignedOut>
          </div>
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white focus:outline-none'
              title="Toggle menu"
            >
              <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                {isMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className='md:hidden mt-4'>
            <Link href='/wallet' className='block text-white hover:text-blue-200 py-2'>
              Wallet
            </Link>
            <Link href='/explorer' className='block text-white hover:text-blue-200 py-2'>
              Explorer
            </Link>
            <SignedIn>
              <div className='py-2'>
                <UserButton afterSignOutUrl='/' />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="block text-white hover:text-blue-200 py-2">Sign In</button>
              </SignInButton>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
