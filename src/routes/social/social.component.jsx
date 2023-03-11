import SocialLeftBar from '../../components/social-left-bar/social-left-bar.component';
import SocialMiddleBar from '../../components/social-middle-bar/social-middle-bar.component';
import SocialRightBar from '../../components/social-right-bar/social-right-bar.component';

import './social.styles.scss';

const Social = () => {
  return (
    <div className='social theme-light'>
      <div style={{ display: 'flex' }}>
        <SocialLeftBar />
        <SocialMiddleBar />
        {/*<SocialRightBar />*/}
      </div>
    </div>
  );
};

export default Social;
