import { Fragment, useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { ReactComponent as NotificationLogo } from '../../assets/notification-svgrepo-com.svg';
import { ReactComponent as ShopLogo } from '../../assets/shop-bag-svgrepo-com.svg';
import { ReactComponent as ProfileLogo } from '../../assets/profile-svgrepo-com.svg';
import { ReactComponent as MessageLogo } from '../../assets/message-square-lines-svgrepo-com.svg';
import { ReactComponent as VideoCallLogo } from '../../assets/video-call-svgrepo-com.svg';

import { signOutUser } from '../../utils/firebase/firebase.utils';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  DropdownMenu,
} from './navigation.styles';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  //DROPDOWN MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <Tooltip title='Home' placement='bottom'>
            <CrwnLogo className='logo' />
          </Tooltip>
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            <Tooltip title='shop' placement='bottom'>
              <ShopLogo />
            </Tooltip>
          </NavLink>

          <NavLink to='/shared-baskets'>
            <Tooltip title='Shared Carts' placement='bottom'>
              <svg
                viewBox='-102.4 -102.4 1228.80 1228.80'
                fill='#000000'
                class='icon'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                stroke='#000000'
                stroke-width='0.01024'
              >
                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  <path
                    d='M800.8 952c-31.2 0-56-24.8-56-56s24.8-56 56-56 56 24.8 56 56-25.6 56-56 56z m-448 0c-31.2 0-56-24.8-56-56s24.8-56 56-56 56 24.8 56 56-25.6 56-56 56zM344 792c-42.4 0-79.2-33.6-84-76l-54.4-382.4-31.2-178.4c-2.4-19.2-19.2-35.2-37.6-35.2H96c-13.6 0-24-10.4-24-24s10.4-24 24-24h40.8c42.4 0 80 33.6 85.6 76l31.2 178.4 54.4 383.2C309.6 728 326.4 744 344 744h520c13.6 0 24 10.4 24 24s-10.4 24-24 24H344z m40-128c-12.8 0-23.2-9.6-24-22.4-0.8-6.4 1.6-12.8 5.6-17.6s10.4-8 16-8l434.4-32c19.2 0 36-15.2 38.4-33.6l50.4-288c1.6-13.6-2.4-28-10.4-36.8-5.6-6.4-12.8-9.6-21.6-9.6H320c-13.6 0-24-10.4-24-24s10.4-24 24-24h554.4c22.4 0 42.4 9.6 57.6 25.6 16.8 19.2 24.8 47.2 21.6 75.2l-50.4 288c-4.8 41.6-42.4 74.4-84 74.4l-432 32c-1.6 0.8-2.4 0.8-3.2 0.8z'
                    fill=''
                  ></path>
                </g>
              </svg>
            </Tooltip>
          </NavLink>
          <NavLink to='/survey-results'>
            <Tooltip title='Survey Results' placement='bottom'>
              <svg
                viewBox='-2.4 -2.4 28.80 28.80'
                xmlns='http://www.w3.org/2000/svg'
                fill='#000000'
                stroke='#000000'
                stroke-width='0.00024000000000000003'
              >
                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  <path d='M19 21H5V5h2v2h10V5h2v2.172l1-1V4h-3V3h-3a2 2 0 0 0-4 0H7v1H4v18h16V11.828l-1 1zM8 4h3V2.615A.615.615 0 0 1 11.614 2h.771a.615.615 0 0 1 .615.615V4h3v2H8zm14.646 1.646l.707.707-8.853 8.854-3.854-3.854.707-.707 3.147 3.147z'></path>
                  <path fill='none' d='M0 0h24v24H0z'></path>
                </g>
              </svg>
            </Tooltip>
          </NavLink>

          <NavLink to='/social'>
            <Tooltip title='Social' placement='bottom'>
              <svg
                viewBox='-2.4 -2.4 28.80 28.80'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  {' '}
                  <path
                    d='M17.8321 9.5547C18.1384 9.09517 18.0142 8.4743 17.5547 8.16795C17.0952 7.8616 16.4743 7.98577 16.168 8.4453L13.3925 12.6085L10.0529 10.3542C9.421 9.92768 8.55941 10.1339 8.18917 10.8004L6.12584 14.5144C5.85763 14.9971 6.03157 15.6059 6.51436 15.8742C6.99714 16.1424 7.60594 15.9684 7.87416 15.4856L9.56672 12.439L12.8571 14.66C13.4546 15.0634 14.2662 14.9035 14.6661 14.3036L17.8321 9.5547Z'
                    fill='#555'
                  ></path>{' '}
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z'
                    fill='#555'
                  ></path>{' '}
                </g>
              </svg>
            </Tooltip>
          </NavLink>

          <NavLink to='/chat'>
            <Tooltip title='Chat With Friends' placement='bottom'>
              <MessageLogo />
            </Tooltip>
          </NavLink>
          <NavLink to='/video-call'>
            <Tooltip title='Video Call' placement='bottom'>
              <VideoCallLogo />
            </Tooltip>
          </NavLink>
          <NavLink to='/notifications'>
            <Tooltip title='Notifications' placement='bottom'>
              <NotificationLogo />
            </Tooltip>
          </NavLink>
          <NavLink to='/profile'>
            <Tooltip title='Profile' placement='bottom'>
              <ProfileLogo />
            </Tooltip>
          </NavLink>
          <NavLink to='/users'>
            <Tooltip title='All Users' placement='bottom'>
              <svg
                fill='#000000'
                viewBox='-192 -192 2304.00 2304.00'
                xmlns='http://www.w3.org/2000/svg'
                stroke='#000000'
                stroke-width='0.019200000000000002'
              >
                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  {' '}
                  <path
                    d='M1807.059 1270.091c-68.668 48.452-188.725 116.556-343.906 158.57-18.861-102.55-92.725-187.37-196.066-219.106-91.708-28.235-185.11-48.339-279.53-61.666 71.944-60.762 121.638-145.807 135.982-243.162 21.91-.791 44.837-1.243 71.04-1.243 166.023.904 331.143 26.316 490.955 75.445 72.621 22.362 121.525 87.755 121.525 162.861v128.301Zm-451.765 338.824c-114.183 80.753-330.24 198.099-621.176 198.099-129.43 0-379.144-26.203-621.177-198.1v-128.752c0-74.993 49.017-140.499 121.75-162.861 162.41-49.694 330.354-74.88 499.427-74.88h8.47c166.588.79 331.821 26.09 491.407 75.106 72.509 22.249 121.3 87.642 121.3 162.635v128.753Zm-903.53-761.901V734.072c0-155.632 126.608-282.352 282.354-282.352 155.746 0 282.353 126.72 282.353 282.352v112.942c0 155.746-126.607 282.353-282.353 282.353S451.765 1002.76 451.765 847.014Zm734.118-734.118c75.22 0 146.146 29.478 199.567 82.899 53.309 53.421 82.786 124.235 82.786 199.454V508.19c0 155.746-126.607 282.353-282.353 282.353-19.651 0-38.4-2.598-56.47-6.438v-50.033c0-156.423-92.047-290.71-224.188-354.748 8.357-148.066 130.447-266.428 280.658-266.428Zm532.857 758.061c-91.37-28.01-184.546-48.226-279.755-61.666 86.174-72.508 142.192-179.802 142.192-301.1V395.248c0-105.374-41.11-204.65-115.877-279.304-74.767-74.767-173.93-115.99-279.417-115.99-200.696 0-365.138 151.002-390.211 345.148-20.217-3.275-40.433-6.325-61.553-6.325-217.977 0-395.294 177.43-395.294 395.294v112.942c0 121.298 56.018 228.593 142.305 301.214-94.305 13.214-188.16 33.092-279.529 61.1C81.092 1246.375 0 1355.249 0 1480.163v185.675l22.588 16.941c275.238 206.344 563.803 237.177 711.53 237.177 344.244 0 593.618-148.63 711.53-237.177l22.587-16.94v-120.51c205.214-50.597 355.652-146.032 429.177-201.373l22.588-16.941V1141.79c0-125.026-80.979-233.901-201.261-270.833Z'
                    fill-rule='evenodd'
                  ></path>{' '}
                </g>
              </svg>
            </Tooltip>
          </NavLink>
          <Tooltip title='Log Out' placement='bottom'>
            {currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                <svg
                  viewBox='-2.4 -2.4 28.80 28.80'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <path
                      d='M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9'
                      stroke='#555'
                      stroke-width='1.44'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    ></path>{' '}
                  </g>
                </svg>
              </NavLink>
            ) : (
              <NavLink to='/auth'>SIGN IN</NavLink>
            )}
          </Tooltip>
          <CartIcon />
        </NavLinks>
        <DropdownMenu>
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{ color: ' #333' }}
          >
            Menu
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => navigate('/shop')}>Shop</MenuItem>
            <MenuItem onClick={() => navigate('/shared-baskets')}>
              Shared Carts
            </MenuItem>
            <MenuItem onClick={() => navigate('/survey-results')}>
              Survey Results
            </MenuItem>
            <MenuItem onClick={() => navigate('/social')}>Social</MenuItem>
            <MenuItem onClick={() => navigate('/chat')}>Chat</MenuItem>
            <MenuItem onClick={() => navigate('/video-call')}>
              Video call
            </MenuItem>
            <MenuItem onClick={() => navigate('/notifications')}>
              Notifications
            </MenuItem>
            <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
            <MenuItem onClick={() => navigate('/users')}>Search User</MenuItem>
            <MenuItem onClick={() => navigate('/checkout')}>
              Go to Checkout
            </MenuItem>
            <MenuItem onClick={signOutUser}>Logout</MenuItem>
          </Menu>
        </DropdownMenu>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
