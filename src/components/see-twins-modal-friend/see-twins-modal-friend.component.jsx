import React from 'react';

const SeeTwinsModalFriend = ({ twin }) => {
  const { friendName, friendEmail, friendProfilePic } = twin;
  return (
    <div>
      <img src={friendProfilePic} alt='twin' />
      <p>{friendName}</p>
      <p>{friendEmail}</p>
    </div>
  );
};

export default SeeTwinsModalFriend;
