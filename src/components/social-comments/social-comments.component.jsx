import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  db,
  getFriends,
  getUser,
  addComment,
} from '../../utils/firebase/firebase.utils';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import './social-comments.styles.scss';
import { convertTimeStampToDate } from '../../utils/utility-functions';

const SocialComments = ({ postId }) => {
  const { currentUser } = useContext(UserContext);
  const [currentUserDoc, setCurrentUserDoc] = useState(null);
  const [commentDesc, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    await addComment(
      currentUser.uid,
      currentUserDoc.displayName,
      currentUserDoc.profilePic,
      commentDesc,
      postId
    );
    setComment('');
  };

  useEffect(() => {
    const getUserData = async () => {
      const userDoc = await getUser(currentUser);
      setCurrentUserDoc(userDoc);
    };
    getUserData();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, 'posts', postId, 'comments'),
      orderBy('timestamp', 'desc')
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const tempComments = [];
      querySnapshot.forEach((doc) => {
        tempComments.push({ commentId: doc.id, ...doc.data() });
      });
      setComments(tempComments);
    });

    return unsub;
  }, []);

  //Temporary
  const Comments = [
    {
      id: 1,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
      name: 'John Doe',
      userId: 1,
      profilePicture:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam',
      name: 'Jane Doe',
      userId: 2,
      profilePicture:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
    },
  ];
  return (
    <div className='social-comments'>
      <div className='write'>
        <img src={currentUserDoc && currentUserDoc.profilePic} alt='' />
        <input
          type='text'
          placeholder='write a comment'
          value={commentDesc}
          onChange={handleCommentChange}
        />
        <button onClick={handleAddComment}>Send</button>
      </div>
      {comments.length !== 0 &&
        comments.map((comment) => (
          <div className='comment'>
            <img src={comment.profilePic} alt='' />
            <div className='info'>
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className='date'>
              {convertTimeStampToDate(comment.timestamp)}
            </span>
          </div>
        ))}
    </div>
  );
};

export default SocialComments;
