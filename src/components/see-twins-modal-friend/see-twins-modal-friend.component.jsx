import React from 'react';
import './see-twins-modal-friend.styles.scss';

const SeeTwinsModalFriend = ({ twin }) => {
  const { friendName, friendEmail, friendProfilePic } = twin;
  return (
    <div className='see-twins-modal-friend-container'>
      <div className='see-twins-modal-friend-img-container'>
        <img
          className='see-twins-modal-friend-img'
          src={friendProfilePic}
          alt='twin'
        />
      </div>
      <div className='see-twins-modal-friend-info-container'>
        <p>{friendName}</p>
        <p>{friendEmail}</p>
      </div>
    </div>
  );
};

export default SeeTwinsModalFriend;
