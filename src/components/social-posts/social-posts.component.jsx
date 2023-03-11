import React, { useEffect, useState } from 'react';
import SocialPost from '../social-post/social-post.component';
import './social-posts.styles.scss';
import { db, getFriends, getUser } from '../../utils/firebase/firebase.utils';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const SocialPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const tempPosts = [];
      querySnapshot.forEach((doc) => {
        tempPosts.push({ postId: doc.id, ...doc.data() });
      });
      setPosts(tempPosts);
    });

    return unsub;
  }, []);

  return (
    <div className='social-posts'>
      {posts.length !== 0 &&
        posts.map((post) => <SocialPost post={post} key={post.postId} />)}
    </div>
  );
};

export default SocialPosts;
