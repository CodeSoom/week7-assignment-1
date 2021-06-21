import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders categories', () => {
    useSelector.mockImplementation((selector) => selector({
      regions: [],
      categories: [],
      restaurants: [],
    }));
    render(<NotFoundPage />);
  });
});
