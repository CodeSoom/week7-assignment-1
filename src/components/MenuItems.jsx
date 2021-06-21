import React from 'react';

export default function MenuItems({ menuItems }) {
  if (!menuItems || menuItems.length === 0) {
    return <p>메뉴가 없어요!</p>;
  }

  return (
    <ul>
      {menuItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
