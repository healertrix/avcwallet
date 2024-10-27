'use client';

import DashboardTabs from '../../components/DashboardTabs';
import SendTransaction from '../../components/SendTransaction';

export default function TransactionsPage() {
  return (
    <div className='min-h-screen bg-white text-gray-900'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-6'>
            Transactions
          </h1>
          <DashboardTabs />
          <div className='mt-8'>
            <SendTransaction />
          </div>
        </div>
      </main>
    </div>
  );
}
