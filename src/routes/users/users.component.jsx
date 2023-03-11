import React, { useContext, useEffect, useState } from 'react';
import User from '../../components/user/user.component';
import { UserContext } from '../../contexts/user.context';
import { db, getFriends, getUser } from '../../utils/firebase/firebase.utils';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import './users.styles.scss';

const FilteredUsers = ({ filteredUsers }) => {
  return (
    <div className='filteredUsers-container'>
      {filteredUsers.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

const Users = () => {
  const [qry, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(UserContext);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const tempUsers = [];
      querySnapshot.forEach((doc) => {
        tempUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(tempUsers);
    });
    return unsub;
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user?.displayName?.toLowerCase().includes(qry.toLowerCase()) ||
        user.email.toLowerCase().includes(qry.toLowerCase())) &&
      user.email !== currentUser.email
  );

  return (
    <div className='users-container'>
      <h2>Find Your Shopping Buddy!</h2>
      <input
        className='users-custom-input'
        type='text'
        onChange={handleQueryChange}
        placeholder='Search a user...'
      />
      {filteredUsers.length === 0 && <h3>No User Found!</h3>}
      {filteredUsers && <FilteredUsers filteredUsers={filteredUsers} />}
    </div>
  );
};

export default Users;
