import React from 'react';
import { useParams } from 'react-router-dom';

import RestaurantContainer from '../components/RestaurantContainer';

export default function RestaurantPage({ params }) {
  // page는 라우터를 알고 있다. id값 제공.
  // 그러나 레스토랑 정보가져오는 처리를 직접하지 않는다.
  const { id } = params || useParams();

  return (<RestaurantContainer restaurantId={id} />

  );
}
