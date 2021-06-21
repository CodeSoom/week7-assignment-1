import { useSelector } from 'react-redux';

import { get } from '../utils';

export default function RestaurantsContainer({ onClickRestaurant }) {
  const restaurants = useSelector(get('restaurants'));

  function handleClick(restaurant) {
    // handleClick을 고차 함수화.
    // (=== onclick((event)=>{onClickRestarant}) ). 이벤트를 파라미터로 받는 함수를 리턴
    return (event) => {
      event.preventDefault(); // a태그의 onClick 링크 이벤트 (페이지 이동)을 막아줌
      onClickRestaurant(restaurant);
    };
  }
  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>
          <a href={`/restaurants/${restaurant.id}`} onClick={handleClick(restaurant)}>
            {restaurant.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
