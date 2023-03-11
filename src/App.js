import { Routes, Route } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { UserContext } from './contexts/user.context';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Profile from './routes/profile/profile.component';
import Users from './routes/users/users.component';
import Notifications from './routes/notifications/notifications.component';
import Chat from './routes/chat/chat.component';
import ChatRoom from './routes/chat-room/chat-room.component';
import SharedBasket from './routes/shared-basket/shared-basket.component';
import SharedBaskets from './routes/shared-baskets/shared-baskets.component';
import SurveyResults from './routes/survey-results/survey-results.component';
import VideoCall from './routes/video-call/video-call.component';
import Social from './routes/social/social.component';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  return <Fragment>{currentUser ? children : <Authentication />}</Fragment>;
};

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Navigation />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='shop/*'
          element={
            <PrivateRoute>
              <Shop />
            </PrivateRoute>
          }
        />
        {/*<Route path='auth' element={<Authentication />} />*/}
        <Route
          path='checkout'
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path='profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='users'
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path='notifications'
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path='chat'
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path='chat/:roomId'
          element={
            <PrivateRoute>
              <ChatRoom />
            </PrivateRoute>
          }
        />
        <Route
          path='shared-baskets'
          element={
            <PrivateRoute>
              <SharedBaskets />
            </PrivateRoute>
          }
        />
        <Route
          path='shared-basket/:basketId' //basketId denotes whose basket it is
          element={
            <PrivateRoute>
              <SharedBasket />
            </PrivateRoute>
          }
        />
        <Route
          path='survey-results'
          element={
            <PrivateRoute>
              <SurveyResults />
            </PrivateRoute>
          }
        />
        <Route
          path='video-call'
          element={
            <PrivateRoute>
              <VideoCall />
            </PrivateRoute>
          }
        />
        <Route
          path='social'
          element={
            <PrivateRoute>
              <Social />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
