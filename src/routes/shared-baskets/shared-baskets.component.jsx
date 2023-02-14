import React, { useContext, useEffect, useState } from 'react';
import SharedBasketFriend from '../../components/shared-basket-friend/shared-basket-friend.component';
import { UserContext } from '../../contexts/user.context';
import { getSharedBasketFriends } from '../../utils/firebase/firebase.utils';

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
    <div>
      <h2>Shared Baskets 🛒</h2>
      {sharedBasketFriends &&
        sharedBasketFriends.map((friend) => (
          <SharedBasketFriend key={friend.id} friend={friend} />
        ))}
    </div>
  );
};

export default SharedBaskets;
