import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RestaurantDetail } from '../../components';

import { loadRestaurant } from '../../redux/actions';

import { get } from '../../utils/utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const restaurant = useSelector(get('restaurant'));

  if (!restaurant) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
    </>
  );
}
