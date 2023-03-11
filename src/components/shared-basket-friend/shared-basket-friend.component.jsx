import React from 'react';
import { useNavigate } from 'react-router-dom';
import './shared-basket-friend.styles.scss';

const SharedBasketFriend = ({ friend }) => {
  const { id, friendName, friendEmail, friendProfilePic } = friend;
  const navigate = useNavigate();
  // console.log(friend);
  const handleClick = () =>
    navigate(`/shared-basket/${id}`, { state: { write: friend.write } });

  return (
    <div className='shared-basket-friend-container'>
      <div className='user-bg-photo'></div>
      <div className='user-img-container'>
        <img
          className='user-face-photo'
          src={friendProfilePic}
          alt='user-profile-pic'
        />
      </div>
      <div className='user-info-container'>
        <h3 className='user-name'>{friendName}</h3>
        <h5 className='user-email'>{friendEmail}</h5>
        <button className='see-shared-cart-btn' onClick={handleClick}>
          See Shared Cart
        </button>
      </div>
    </div>
  );
};

export default SharedBasketFriend;
