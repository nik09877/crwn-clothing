import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';

import {
  uploadCoverPic,
  uploadProfilePic,
  getUser,
  getFriends,
  getPosts,
} from '../../utils/firebase/firebase.utils';
import SocialPost from '../social-post/social-post.component';
import './social-profile.styles.scss';

const SocialProfile = () => {
  const { currentUser } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState('');
  const [coverPic, setCoverPic] = useState(
    'https://images.unsplash.com/photo-1559311648-d46f5d8593d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1150&q=80'
  );
  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleUploadProfilePic = async (e) => {
    const file = e.target.files[0];
    await uploadProfilePic(currentUser, file, setProfilePic);
  };
  const handleUploadCoverPic = async (e) => {
    const file = e.target.files[0];
    await uploadCoverPic(currentUser, file, setCoverPic);
  };

  useEffect(() => {
    const getUserData = async () => {
      const userDoc = await getUser(currentUser);
      setCurrentUserDoc(userDoc);
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getUserProfilePic = async () => {
      const { profilePic } = await getUser(currentUser);
      setProfilePic(profilePic);
    };
    getUserProfilePic();
  }, []);

  useEffect(() => {
    const getUserCoverPic = async () => {
      const { coverPic: coverPicture } = await getUser(currentUser);
      coverPicture && setCoverPic(coverPicture);
    };
    getUserCoverPic();
  }, []);

  useEffect(() => {
    const getAllFriends = async () => {
      await getFriends(currentUser, setFriends);
    };
    getAllFriends();
  }, []);

  useEffect(() => {
    const getAllPosts = async () => {
      await getPosts(setPosts);
    };
    getAllPosts();
  }, []);

  const filteredPosts = posts.filter((post) => post.userId === currentUser.uid);

  return (
    <div className='social-profile'>
      <div className='images'>
        <img src={coverPic} alt='coverPhoto' className='cover' />
        <img src={profilePic} alt='profilePic' className='profilePic' />
        <input
          style={{ display: 'none' }}
          type='file'
          id='cover-photo'
          onChange={handleUploadCoverPic}
        />
        <label htmlFor='cover-photo' className='cover-label'>
          <img
            src='https://img.icons8.com/material-outlined/512/camera--v2.png'
            alt=''
          />
        </label>
        <input
          style={{ display: 'none' }}
          type='file'
          id='profile'
          onChange={handleUploadProfilePic}
        />
        <label htmlFor='profile' className='profile-label'>
          <img
            src='https://img.icons8.com/material-outlined/512/camera--v2.png'
            alt=''
          />
        </label>
      </div>
      <div className='profileContainer'>
        <div className='uInfo'>
          <div className='center'>
            <span>{currentUserDoc && currentUserDoc.displayName}</span>
            <div className='info'>
              <div className='item'>
                <span>{friends && friends.length}</span>
                <span>Friends</span>
              </div>
              <div className='item'>
                <span>{filteredPosts.length}</span>
                <span>posts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='social-friends-container'>
        <h2>Your Shopping Buddies🫂</h2>
        {friends &&
          friends.map((friend) => (
            <div className='social-friend-container' key={friend.id}>
              <div className='social-image-container'>
                <img
                  className='social-img'
                  src={friend.friendProfilePic}
                  alt='profile-pic'
                />
              </div>
              <div className='social-info-container'>
                <p>{friend.friendName}</p>
                <p>{friend.friendEmail}</p>
              </div>
            </div>
          ))}
      </div>
      <h2>Your Posts</h2>
      <div className='social-posts'>
        {filteredPosts &&
          filteredPosts.map((post) => (
            <SocialPost key={post.postId} post={post} />
          ))}
      </div>
    </div>
  );
};

export default SocialProfile;
