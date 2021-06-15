import { useSelector } from 'react-redux';

import { get } from '../../utils/utils';

export default function RestaurantsContainer({ onClickRestaurant }) {
  const restaurants = useSelector(get('restaurants'));

  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <button onClick={() => onClickRestaurant(restaurant)} type="button">
            {restaurant.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
