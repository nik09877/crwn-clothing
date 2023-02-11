import React from 'react';
import { useLocation } from 'react-router-dom';

const SeeTwins = () => {
  const { state } = useLocation();

  return (
    <div className='see-twins-container'>
      {state.map((friend) => {
        const { friendEmail, friendName, friendProfilePic } = friend;
        return (
          <div className='twin-container' key={friendEmail}>
            <img src={friendProfilePic} alt='' />
            <p>{friendName}</p>
            <p>{friendEmail}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SeeTwins;
