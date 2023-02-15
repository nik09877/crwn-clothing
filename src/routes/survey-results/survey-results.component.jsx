import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../utils/firebase/firebase.utils';
import SurveyResultsProduct from '../../components/survey-results-product/survey-results-product.component';

const SurveyResults = () => {
  const [products, setProducts] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const q = query(
      collection(db, 'users', currentUser.uid, 'surveyResults'),
      where('itemPrice', '>', 0)
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      const prods = [];
      querySnapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() });
      });
      setProducts(prods);
    });
    return unsub;
  }, []);

  return (
    <div>
      {products &&
        products.map((product) => (
          <SurveyResultsProduct key={product.id} product={product} />
        ))}
    </div>
  );
};

export default SurveyResults;
