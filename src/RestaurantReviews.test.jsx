import { render } from '@testing-library/react';

import RestaurantReviews from './RestaurantReviews';

describe('RestaurantReviews', () => {
  const reviews = [
    {
      id: 1,
      name: '테스터',
      score: 5,
      description: '훌륭하다 훌륭하다 지구인놈들',
    },
    {
      id: 2,
      name: '동우',
      score: 1,
      description: '배탈남',
    },
  ];

  it('renders sorted reviews', () => {
    const { getAllByTestId } = render(
      <RestaurantReviews reviews={reviews} />,
    );

    const sortedReviews = [...reviews].sort((a, b) => b.id - a.id);

    sortedReviews.forEach((_, index) => {
      expect(getAllByTestId('review-name')[index]).toHaveTextContent(sortedReviews[index].name);
      expect(getAllByTestId('review-score')[index]).toHaveTextContent(sortedReviews[index].score);
      expect(getAllByTestId('review-description')[index]).toHaveTextContent(sortedReviews[index].description);
    });
  });
});
