import React, { useContext, useEffect, useState } from 'react';
import User from '../../components/user/user.component';
import { UserContext } from '../../contexts/user.context';
import { getUsers } from '../../utils/firebase/firebase.utils';

const Users = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(UserContext);
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
      (user.displayName.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())) &&
      user.email !== currentUser.email
  );

  return (
    <div className='users-container'>
      <h2>Find Your Shopping Buddy!</h2>
      <input type='text' onChange={handleQueryChange} />
      {filteredUsers.length === 0 && <div>No User Found!</div>}
      {filteredUsers &&
        filteredUsers.map((user) => <User key={user.id} user={user} />)}
    </div>
  );
};

export default Users;
