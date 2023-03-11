import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';

import Image from '../../assets/img.png';
import Map from '../../assets/map.png';
import Friend from '../../assets/friend.png';

import {
  createPost,
  getUser,
  storage,
} from '../../utils/firebase/firebase.utils';

import './social-share.styles.scss';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const SocialShare = () => {
  const { currentUser } = useContext(UserContext);
  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const [picture, setPicture] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      const userDoc = await getUser(currentUser);
      setCurrentUserDoc(userDoc);
    };
    getUserData();
  }, []);

  const handleChangePicture = (e) => {
    setPicture(e.target.files[0]);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleSharePost = async () => {
    if (picture) {
      const metadata = {
        contentType: 'image/jpeg',
      };
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(
        storage,
        'posts/' + currentUser.email + '-post-photo-' + picture.name
      );
      const uploadTask = uploadBytesResumable(storageRef, picture, metadata);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await createPost(
                currentUserDoc.id,
                currentUserDoc.displayName,
                currentUserDoc.profilePic,
                downloadURL,
                content
              );
              setContent((_) => '');
              setPicture((_) => '');
            } catch (err) {
              console.log(err);
            }
          });
        }
      );
    } else {
      await createPost(
        currentUserDoc.id,
        currentUserDoc.displayName,
        currentUserDoc.profilePic,
        picture,
        content
      );
      setContent('');
      setPicture('');
    }
  };

  return (
    <div className='social-share'>
      <div className='container'>
        <div className='top'>
          <img src={currentUserDoc && currentUserDoc.profilePic} alt='' />
          <input
            type='text'
            placeholder={`What's on your mind ${
              currentUserDoc && currentUserDoc.displayName
            }?`}
            value={content}
            onChange={handleChangeContent}
          />
        </div>
        <hr />
        <div className='bottom'>
          <div className='left'>
            <input
              type='file'
              id='file'
              style={{ display: 'none' }}
              onChange={handleChangePicture}
            />
            <label htmlFor='file'>
              <div className='item'>
                <img src={Image} alt='' />
                <span>Add Image</span>
              </div>
            </label>
            <div className='item'>
              <img src={Map} alt='' />
              <span>Add Place</span>
            </div>
            <div className='item'>
              <img src={Friend} alt='' />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className='right'>
            <button onClick={handleSharePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
