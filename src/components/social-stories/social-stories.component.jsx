import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { getUser, getUsers } from '../../utils/firebase/firebase.utils';
import './social-stories.styles.scss';

const SocialStories = () => {
  const { currentUser } = useContext(UserContext);
  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const userDoc = await getUser(currentUser);
      setCurrentUserDoc(userDoc);
    };
    getUserData();
  }, []);
  useEffect(() => {
    const getAllUserData = async () => {
      const userDoc = await getUsers(setStories);
    };
    getAllUserData();
  }, []);

  const filteredStories = stories.filter(
    (story) => story.id !== currentUser.uid
  );

  return (
    <div className='social-stories'>
      <div className='story'>
        <img src={currentUserDoc && currentUserDoc.profilePic} alt='' />
        <span>{currentUserDoc && currentUserDoc.displayName}</span>
        <button>+</button>
      </div>
      {filteredStories.length >= 4
        ? filteredStories.slice(0, 4).map((story) => (
            <div className='story' key={story.id}>
              <img src={story.profilePic} alt='' />
              <span>{story.displayName}</span>
            </div>
          ))
        : filteredStories.map((story) => (
            <div className='story' key={story.id}>
              <img src={story.profilePic} alt='' />
              <span>{story.displayName}</span>
            </div>
          ))}
    </div>
  );
};

export default SocialStories;
