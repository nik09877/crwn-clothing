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
              {comment.timestamp && convertTimeStampToDate(comment.timestamp)}
            </span>
          </div>
        ))}
    </div>
  );
};

export default SocialComments;
