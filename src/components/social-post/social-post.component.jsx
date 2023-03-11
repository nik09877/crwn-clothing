import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { useContext, useEffect, useState } from 'react';

import './social-post.styles.scss';
import SocialComments from '../social-comments/social-comments.component';
import {
  db,
  deletePost,
  updateLikeCnt,
} from '../../utils/firebase/firebase.utils';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserContext } from '../../contexts/user.context';
import { convertTimeStampToDate } from '../../utils/utility-functions';

const SocialPost = ({ post }) => {
  const { userId, name, profilePic, postId, desc, img, timestamp } = post;
  const { currentUser } = useContext(UserContext);

  const [commentOpen, setCommentOpen] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLiked = async (type) => {
    await updateLikeCnt(currentUser.uid, postId, type);
  };
  const handleDeletePost = async () => {
    await deletePost(postId);
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'posts', postId), (doc) => {
      const likesArr = doc.data().likes;
      setLikeCnt(likesArr.length);
      setLiked(likesArr.includes(currentUser.uid));
    });
    return unsub;
  }, []);

  return (
    <div className='social-post'>
      <div className='container'>
        <div className='user'>
          <div className='userInfo'>
            <img src={profilePic} alt='' />
            <div className='details'>
              <span className='name'>{name}</span>
              <span className='date'>{convertTimeStampToDate(timestamp)}</span>
            </div>
          </div>
          {currentUser.uid === userId ? (
            <ClearSharpIcon
              style={{ cursor: 'pointer' }}
              onClick={handleDeletePost}
            />
          ) : (
            <MoreHorizIcon style={{ cursor: 'pointer' }} />
          )}
        </div>
        <div className='content'>
          <p>{desc}</p>
          <img src={img} alt='' />
        </div>
        <div className='info'>
          <div className='item'>
            {liked ? (
              <FavoriteOutlinedIcon onClick={() => handleLiked('dec')} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={() => handleLiked('inc')} />
            )}
            {likeCnt} Likes
          </div>
          <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Comments
          </div>
          <div className='item'>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <SocialComments postId={postId} />}
      </div>
    </div>
  );
};

export default SocialPost;
