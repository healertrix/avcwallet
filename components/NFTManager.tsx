'use client';

import { useState } from 'react';

export default function NFTManager() {
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fee, setFee] = useState('');
  const [mintMessage, setMintMessage] = useState('');

  const [tokenId, setTokenId] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [transferMessage, setTransferMessage] = useState('');

  const [viewTokenId, setViewTokenId] = useState('');
  const [nftData, setNftData] = useState(null);

  const [viewOwnerAddress, setViewOwnerAddress] = useState('');
  const [ownedNFTs, setOwnedNFTs] = useState(null);

  const handleMintNFT = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/mint-nft',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            owner,
            metadata: { name, description },
            fee: parseFloat(fee),
          }),
        }
      );
      const data = await response.json();
      setMintMessage(`NFT minted with token ID: ${data.tokenId}`);
    } catch (error) {
      console.error('Error minting NFT:', error);
      setMintMessage('Error minting NFT');
    }
  };

  const handleTransferNFT = async () => {
    try {
      const response = await fetch(
        'https://avc-production.up.railway.app/api/transfer-nft',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tokenId,
            fromAddress,
            toAddress,
            privateKey,
          }),
        }
      );
      const data = await response.json();
      setTransferMessage(data.message);
    } catch (error) {
      console.error('Error transferring NFT:', error);
      setTransferMessage('Error transferring NFT');
    }
  };

  const handleViewNFT = async () => {
    try {
      const response = await fetch(
        `https://avc-production.up.railway.app/api/nft/${viewTokenId}`
      );
      const data = await response.json();
      setNftData(data);
    } catch (error) {
      console.error('Error viewing NFT:', error);
      setNftData(null);
    }
  };

  const handleViewOwnedNFTs = async () => {
    try {
      const response = await fetch(
        `https://avc-production.up.railway.app/api/nfts/${viewOwnerAddress}`
      );
      const data = await response.json();
      setOwnedNFTs(data);
    } catch (error) {
      console.error('Error viewing owned NFTs:', error);
      setOwnedNFTs(null);
    }
  };

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>NFT Manager</h2>

      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>Mint NFT</h3>
        <input
          type='text'
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder='Owner Address'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='NFT Name'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='NFT Description'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='number'
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          placeholder='Fee'
          className='border p-2 mb-2 w-full'
        />
        <button
          onClick={handleMintNFT}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full'
        >
          Mint NFT
        </button>
        {mintMessage && <p className='mt-2'>{mintMessage}</p>}
      </div>

      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>Transfer NFT</h3>
        <input
          type='text'
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder='Token ID'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='text'
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value)}
          placeholder='From Address'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='text'
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder='To Address'
          className='border p-2 mb-2 w-full'
        />
        <input
          type='password'
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder='Private Key'
          className='border p-2 mb-2 w-full'
        />
        <button
          onClick={handleTransferNFT}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
        >
          Transfer NFT
        </button>
        {transferMessage && <p className='mt-2'>{transferMessage}</p>}
      </div>

      <div className='mb-6'>
        <h3 className='font-semibold mb-2'>View NFT</h3>
        <input
          type='text'
          value={viewTokenId}
          onChange={(e) => setViewTokenId(e.target.value)}
          placeholder='Token ID'
          className='border p-2 mb-2 w-full'
        />
        <button
          onClick={handleViewNFT}
          className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full'
        >
          View NFT
        </button>
        {nftData && (
          <div className='mt-2'>
            <h4 className='font-semibold'>NFT Data:</h4>
            <pre>{JSON.stringify(nftData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3 className='font-semibold mb-2'>View Owned NFTs</h3>
        <input
          type='text'
          value={viewOwnerAddress}
          onChange={(e) => setViewOwnerAddress(e.target.value)}
          placeholder='Owner Address'
          className='border p-2 mb-2 w-full'
        />
        <button
          onClick={handleViewOwnedNFTs}
          className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full'
        >
          View Owned NFTs
        </button>
        {ownedNFTs && (
          <div className='mt-2'>
            <h4 className='font-semibold'>Owned NFTs:</h4>
            <pre>{JSON.stringify(ownedNFTs, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
