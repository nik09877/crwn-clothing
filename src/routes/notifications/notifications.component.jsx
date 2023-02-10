import React, { Fragment, useContext, useEffect, useState } from 'react';
import { getFriendRequests } from '../../utils/firebase/firebase.utils';
import { useForceRender } from '../../utils/force-render-hook';
import { UserContext } from '../../contexts/user.context';
import Notification from '../../components/notification/notification.component';

const Notifications = () => {
  const forceRender = useForceRender();
  const [friendRequests, setFriendRequests] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getRequests = async () => {
      await getFriendRequests(currentUser, setFriendRequests);
    };
    getRequests();
  }, []);

  return (
    <div className='notifications-container'>
      {friendRequests.length === 0 ? (
        <h2>No Friend Requests!</h2>
      ) : (
        <Fragment>
          <h2>Friend Requests</h2>
          {friendRequests.map((friendRequest) => (
            <Notification
              key={friendRequest.id}
              friendRequest={friendRequest}
              forceRender={forceRender}
            />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Notifications;