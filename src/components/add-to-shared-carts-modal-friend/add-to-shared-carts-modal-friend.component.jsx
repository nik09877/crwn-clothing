import { doc, increment, updateDoc } from 'firebase/firestore';
import {
  addItemToBasket,
  checkItemExistsInBasket,
  db,
  updateItemInBasket,
} from '../../utils/firebase/firebase.utils';

import './add-to-shared-carts-modal-friend.styles.scss';

const AddToSharedCartsModalFriend = ({ friend, product }) => {
  const { friendName, friendEmail, friendProfilePic } = friend;

  const handleAddToCart = async () => {
    const prodExists = await checkItemExistsInBasket(
      { uid: friend.id },
      product
    );
    prodExists &&
      (await updateItemInBasket({ uid: friend.id }, product, 'inc'));
    !prodExists && (await addItemToBasket({ uid: friend.id }, product));

    await updateDoc(doc(db, 'users', friend.id), {
      noItems: increment(1),
      subtotal: increment(product.price),
    });
  };

  return (
    <div
      className='add-to-shared-carts-modal-friend-container'
      onClick={handleAddToCart}
    >
      <div className='add-to-shared-carts-modal-friend-img-container'>
        <img
          className='add-to-shared-carts-modal-friend-img'
          src={friendProfilePic}
          alt='friend'
        />
      </div>
      <div className='add-to-shared-carts-modal-friend-info-container'>
        <p>{friendName}</p>
        <p>{friendEmail}</p>
      </div>
    </div>
  );
};

export default AddToSharedCartsModalFriend;
