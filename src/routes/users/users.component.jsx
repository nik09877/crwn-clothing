import React, { useEffect, useState } from 'react';
import { getUsers } from '../../utils/firebase/firebase.utils';

const Users = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      await getUsers(setUsers);
    };
    getAllUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.displayName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='users-container'>
      <h2>Find Your Shopping Buddy!</h2>
      <input type='text' onChange={handleQueryChange} />
      {filteredUsers.length &&
        filteredUsers.map((user) => (
          <div className='user-container'>
            <img src={user.profilePic} alt='user-image' />
            <p>{user.displayName}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </div>
  );
};

export default Users;
