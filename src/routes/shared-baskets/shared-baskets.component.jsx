import React, { useContext, useEffect, useState } from 'react';
import SharedBasketFriend from '../../components/shared-basket-friend/shared-basket-friend.component';
import { UserContext } from '../../contexts/user.context';
import { getSharedBasketFriends } from '../../utils/firebase/firebase.utils';

import './shared-basket.styles.scss';

const SharedBasketFriends = ({ sharedBasketFriends }) => {
  return (
    <div className='shared-basket-friends-container'>
      {sharedBasketFriends.map((friend) => (
        <SharedBasketFriend key={friend.id} friend={friend} />
      ))}
    </div>
  );
};

const SharedBaskets = () => {
  const [sharedBasketFriends, setSharedBasketFriends] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getAllFriends = async () => {
      const friends = await getSharedBasketFriends(currentUser);
      setSharedBasketFriends(friends);
    };
    getAllFriends();
  }, []);

  return (
    <div className='shared-basket-container'>
      <h2>Shared Carts 🛒</h2>
      {sharedBasketFriends.length === 0 && <h3>No Shared Cart Found!</h3>}
      {sharedBasketFriends && (
        <SharedBasketFriends sharedBasketFriends={sharedBasketFriends} />
      )}
    </div>
  );
};

export default SharedBaskets;
