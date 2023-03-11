import React from 'react';
import SocialPosts from '../social-posts/social-posts.component';
import SocialShare from '../social-share/social-share.component';
import SocialStories from '../social-stories/social-stories.component';
import './social-middle-bar.styles.scss';

const SocialMiddleBar = () => {
  return (
    <div className='social-middle-bar'>
      <div className='social-middle-bar-wrapper'>
        <SocialShare />
        <SocialPosts />
      </div>
    </div>
  );
};

export default SocialMiddleBar;
