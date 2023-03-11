import React, { Fragment, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  checkBasketAccessPermission,
  updateShareBasketPermission,
} from '../../utils/firebase/firebase.utils';
import './share-basket-modal-friend.styles.scss';

const ShareBasketModalFriend = ({ friend }) => {
  const { friendName, friendEmail, friendProfilePic } = friend;
  const [hasReadPermission, setHasReadPermission] = useState(false);
  const [hasWritePermission, setHasWritePermission] = useState(false);
  const [editAccess, setEditAccess] = useState(false);
  const { currentUser } = useContext(UserContext);

  const toggleEditAccess = () => setEditAccess((prev) => !prev);
  const handleShareBasket = async () => {
    if (editAccess) {
      await updateShareBasketPermission(
        currentUser,
        friend,
        'GIVE_COMPLETE_ACCESS'
      );
    } else {
      await updateShareBasketPermission(
        currentUser,
        friend,
        'GIVE_READ_ACCESS'
      );
    }
  };
  const revokeEditAccess = async () => {
    await updateShareBasketPermission(
      currentUser,
      friend,
      'REVOKE_EDIT_ACCESS'
    );
  };
  const giveEditAccess = async () => {
    await updateShareBasketPermission(
      currentUser,
      friend,
      'GIVE_COMPLETE_ACCESS'
    );
  };
  const revokeCompleteAccess = async () => {
    await updateShareBasketPermission(
      currentUser,
      friend,
      'REVOKE_COMPLETE_ACCESS'
    );
  };

  useEffect(() => {
    const checkReadPermission = async () => {
      setHasReadPermission(
        await checkBasketAccessPermission(currentUser, friend, 'read')
      );
    };
    checkReadPermission();
  }, []);

  useEffect(() => {
    const checkWritePermission = async () => {
      setHasWritePermission(
        await checkBasketAccessPermission(currentUser, friend, 'write')
      );
    };
    checkWritePermission();
  }, []);

  return (
    <div className='share-basket-modal-friend-container'>
      <div className='share-basket-modal-friend-img-container'>
        <img
          className='share-basket-modal-friend-img'
          src={friendProfilePic}
          alt='friend'
        />
      </div>
      <div className='share-basket-modal-friend-info-container'>
        <p>{friendName}</p>
        <p>{friendEmail}</p>
      </div>
      <div className='permissions-container'>
        {hasWritePermission ? (
          <Fragment>
            <button className='permission-btn' onClick={revokeEditAccess}>
              Revoke Edit Access
            </button>
            <button className='permission-btn' onClick={revokeCompleteAccess}>
              Revoke Full Access
            </button>
          </Fragment>
        ) : (
          [
            hasReadPermission ? (
              <Fragment>
                <button className='permission-btn' onClick={giveEditAccess}>
                  Give Edit Access
                </button>
                <button
                  className='permission-btn'
                  onClick={revokeCompleteAccess}
                >
                  Revoke Full Access
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <div className='permission-btn'>
                  <input
                    name='edit-access'
                    type='checkbox'
                    onChange={toggleEditAccess}
                    defaultChecked={editAccess}
                  />
                  <label htmlFor='edit-access'>Give edit access</label>
                </div>
                <button className='permission-btn' onClick={handleShareBasket}>
                  Share Your Cart
                </button>
              </Fragment>
            ),
          ]
        )}
      </div>
    </div>
  );
};

export default ShareBasketModalFriend;
