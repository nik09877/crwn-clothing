import React from 'react';
import { useNavigate } from 'react-router-dom';

const SharedBasketFriend = ({ friend }) => {
  const { id, friendName, friendEmail, friendProfilePic } = friend;
  const navigate = useNavigate();
  // console.log(friend);
  const handleClick = () =>
    navigate(`/shared-basket/${id}`, { state: { write: friend.write } });

  return (
    <div>
      <div>
        <img src={friendProfilePic} alt='friend' />
        <p>{friendName}</p>
        <p>{friendEmail}</p>
      </div>
      <div>
        <button onClick={handleClick}>See Shared Cart</button>
      </div>
    </div>
  );
};

export default SharedBasketFriend;
