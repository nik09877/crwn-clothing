import { Routes, Route, Navigate } from 'react-router-dom';
import { Fragment, useContext } from 'react';

import { UserContext } from './contexts/user.context';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Profile from './routes/profile/profile.component';

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
        <Route path='auth' element={<Authentication />} />
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
      </Route>
    </Routes>
  );
};

export default App;
