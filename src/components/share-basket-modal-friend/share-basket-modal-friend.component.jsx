import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import {
  checkBasketAccessPermission,
  updateShareBasketPermission,
} from '../../utils/firebase/firebase.utils';

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
      <div className='info'>
        <img src={friendProfilePic} alt='friend' />
        <p>{friendName}</p>
        <p>{friendEmail}</p>
      </div>
      <div className='permissions'>
        {hasWritePermission ? (
          <div>
            <button
              variant='flat'
              style={{ margin: 10 }}
              onClick={revokeEditAccess}
            >
              Revoke Edit Access
            </button>
            <button
              variant='flat'
              style={{ margin: 10 }}
              onClick={revokeCompleteAccess}
            >
              Revoke Complete Access
            </button>
          </div>
        ) : (
          [
            hasReadPermission ? (
              <div>
                <button
                  variant='flat'
                  style={{ margin: 10 }}
                  onClick={giveEditAccess}
                >
                  Give Edit Access
                </button>
                <button
                  variant='flat'
                  style={{ margin: 10 }}
                  onClick={revokeCompleteAccess}
                >
                  Revoke Complete Access
                </button>
              </div>
            ) : (
              <div>
                <input
                  type='checkbox'
                  onChange={toggleEditAccess}
                  defaultChecked={editAccess}
                />
                &nbsp; Give edit access
                <button
                  variant='flat'
                  style={{ margin: 10 }}
                  onClick={handleShareBasket}
                >
                  Share Your Basket
                </button>
              </div>
            ),
          ]
        )}
      </div>
    </div>
  );
};

export default ShareBasketModalFriend;
