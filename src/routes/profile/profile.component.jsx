import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';

import {
  uploadProfilePic,
  getUser,
  getFriends,
} from '../../utils/firebase/firebase.utils';

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState('');
  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const [friends, setFriends] = useState([]);

  const handleUploadProfilePic = async (e) => {
    const file = e.target.files[0];
    await uploadProfilePic(currentUser, file, setProfilePic);
  };

  useEffect(() => {
    const getUserProfilePic = async () => {
      const { profilePic } = await getUser(currentUser);
      setProfilePic(profilePic);
    };
    getUserProfilePic();
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const userDoc = await getUser(currentUser);
      setCurrentUserDoc(userDoc);
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getAllFriends = async () => {
      await getFriends(currentUser, setFriends);
    };
    getAllFriends();
  }, []);

  return (
    <div className='profile-container'>
      <div className='profile'>
        <h2>Your Profile</h2>
        <div className='image-container'>
          <img src={profilePic} alt='profile-pic' />
          <input
            style={{ display: 'none' }}
            type='file'
            id='profile-pic'
            onChange={handleUploadProfilePic}
          />
          <label htmlFor='profile-pic'>
            <img src='' alt='plus-button' />
            <span>Upload Profile Pic</span>
          </label>
        </div>
        <p>{currentUserDoc && currentUserDoc.displayName}</p>
        <p>{currentUserDoc && currentUserDoc.email}</p>
      </div>
      <div className='friends-container'>
        <h2>Your Shopping Buddies🫂</h2>
        {friends &&
          friends.map((friend) => (
            <div className='frined-container'>
              <div className='image-container'>
                <img src={''} alt='profile-pic' />
              </div>
              <p>{currentUserDoc.displayName}</p>
              <p>{currentUserDoc.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
