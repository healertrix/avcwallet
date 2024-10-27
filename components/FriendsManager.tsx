import { useState, useEffect } from 'react';

interface Friend {
  name: string;
  publicKey: string;
}

export default function FriendsManager({ onSelectFriend }) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [name, setName] = useState('');
  const [publicKey, setPublicKey] = useState('');

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem('friends') || '[]');
    setFriends(storedFriends);
  }, []);

  const addFriend = () => {
    const newFriends = [...friends, { name, publicKey }];
    setFriends(newFriends);
    localStorage.setItem('friends', JSON.stringify(newFriends));
    setName('');
    setPublicKey('');
  };

  const deleteFriend = (index: number) => {
    const updatedFriends = friends.filter((_, i) => i !== index);
    setFriends(updatedFriends);
    localStorage.setItem('friends', JSON.stringify(updatedFriends));
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-lg font-semibold mb-4">Manage Friends</h3>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Friend's Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          placeholder="Public Key"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
        />
        <button
          onClick={addFriend}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Add Friend
        </button>
      </div>
      <ul className="list-disc pl-5">
        {friends.map((friend, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium">{friend.name}</span> - {friend.publicKey}
            <button
              onClick={() => onSelectFriend(friend.publicKey)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
            >
              Select
            </button>
            <button
              onClick={() => deleteFriend(index)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
