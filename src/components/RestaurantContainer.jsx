import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';
import ReviewForm from './ReviewForm';
import RestaurantReviews from './RestaurantReviews';
import {
  loadRestaurant,
  changeReviewField,
  sendReview,
} from '../redux/actions';
import { get } from '../utils';

export default function RestaurantContainer({ restaurantId }) {
  // 레스토랑 컨테이너는 라우터를 알필요 없다.
  // id값을 통해 레스토랑 정보를 조회하고 표현한다.
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const accessToken = useSelector(get('accessToken'));
  const restaurant = useSelector(get('restaurant'));
  const reviewFields = useSelector(get('reviewFields'));
  // const { reviews } = restaurant || { reviews: [] };

  if (!restaurant) {
    return <p> Loading...</p>;
  }

  function handleChange({ name, value }) {
    dispatch(changeReviewField({ name, value }));
  }
  function handleSubmit() {
    dispatch(sendReview({ restaurantId }));
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      {accessToken ? (
        <ReviewForm
          fields={reviewFields}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : null}
      <RestaurantReviews reviews={restaurant.reviews} />
    </>
  );
}
