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
import { CartProvider } from './contexts/cart.context';

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
            <CartProvider>
              <Navigation />
            </CartProvider>
          </PrivateRoute>
        }
      >
        <Route
          index
          element={
            <PrivateRoute>
              <CartProvider>
                <Home />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='shop/*'
          element={
            <PrivateRoute>
              <CartProvider>
                <Shop />
              </CartProvider>
            </PrivateRoute>
          }
        />
        {/*<Route path='auth' element={<Authentication />} />*/}
        <Route
          path='checkout'
          element={
            <PrivateRoute>
              <CartProvider>
                <Checkout />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='profile'
          element={
            <PrivateRoute>
              <CartProvider>
                <Profile />
              </CartProvider>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='users'
          element={
            <PrivateRoute>
              <CartProvider>
                <Users />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='notifications'
          element={
            <PrivateRoute>
              <CartProvider>
                <Notifications />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='chat'
          element={
            <PrivateRoute>
              <CartProvider>
                <Chat />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='chat/:roomId'
          element={
            <PrivateRoute>
              <CartProvider>
                <ChatRoom />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='shared-baskets'
          element={
            <PrivateRoute>
              <CartProvider>
                <SharedBaskets />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='shared-basket/:basketId' //basketId denotes whose basket it is
          element={
            <PrivateRoute>
              <CartProvider>
                <SharedBasket />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='survey-results'
          element={
            <PrivateRoute>
              <CartProvider>
                <SurveyResults />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='video-call'
          element={
            <PrivateRoute>
              <CartProvider>
                <VideoCall />
              </CartProvider>
            </PrivateRoute>
          }
        />
        <Route
          path='social'
          element={
            <PrivateRoute>
              <CartProvider>
                <Social />
              </CartProvider>
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
