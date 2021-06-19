import React from 'react';

export default function ReviewList() {
  const reviews = [
    {
      name: '테스터',
      score: 1,
      description: '알고보니 김밥집',
    },
    {
      name: '테스터',
      score: 5,
      description: 'good',
    },
    {
      name: '테스터',
      score: 1,
      description: '알고보니 김밥집',
    },
  ];

  return (
    <ul>
      <li>{reviews[0].name}</li>
      <li>{reviews[0].score}</li>
      <li>{reviews[0].description}</li>
    </ul>
  );
}
