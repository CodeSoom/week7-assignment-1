import React from 'react';

import MenuItems from './MenuItems';

export default function RestaurantDetail({ restaurant }) {
  const { name, address, menuItems } = restaurant;
  return (
    <div>
      <h2>{name}</h2>
      <p>{address}</p>
      <h3>메뉴</h3>
      {/* {JSON.stringify(menuItems)} //빠르게 배열 확인 */}
      <MenuItems menuItems={menuItems} />
    </div>
  );
}
