import React from 'react';

import { Link } from 'react-router-dom';
// Link를 사용함으로써, 싱글페이지 웹사이트 장점을 살린다.
// 서버에서 데이터 가져올 것 없이 페이지 로딩이 된다.
// a 태그를 써서 페이지 이동할 때는 새로운 페이지를 다시 처음부터 그리는데,
// link를 사용하면 dom만 업데이트 하는듯 (추가 조사)
export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li><Link to="/about">소개</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/xxx">NotFound Sample</Link></li>
        <li><Link to="/login">Login</Link></li>

      </ul>
    </div>
  );
}
