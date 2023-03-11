import SocialLeftBar from '../../components/social-left-bar/social-left-bar.component';
import SocialProfile from '../../components/social-profile/social-profile.component';
import SocialRightBar from '../../components/social-right-bar/social-right-bar.component';

import './profile.styles.scss';

const Profile = () => {
  return (
    <div className='profile theme-light'>
      <div style={{ display: 'flex' }}>
        <SocialLeftBar />
        <SocialProfile />
        {/*<SocialRightBar />*/}
      </div>
    </div>
  );
};

export default Profile;
