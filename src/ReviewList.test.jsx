import { render } from '@testing-library/react';

import ReviewList from './ReviewList';

describe('ReviewList', () => {
  describe('when has reviews', () => {
    it('renders reviews', () => {
      const { getByText } = render(<ReviewList />);

      expect(getByText('good')).not.toBeNull();
      expect(getByText('5')).not.toBeNull();
    });
  });

  // describe('when has no review', () => {

  // });
});
