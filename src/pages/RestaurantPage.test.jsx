import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import RestaurantPage from './RestaurantPage';

describe('RestaurantsPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((state) => state({
      restaurant: { id: 1, name: '마법사주방', address: '서울시 강남구' },
      reviewFields: { score: '', description: '' },
      accessToken: 'ACCESS_TOKEN',
    }));
  });

  context('with params.id', () => {
    function renderPageWithProps() {
      const params = { id: 1 };
      return render(<RestaurantPage params={params} />);
    }
    it('renders restaurant', () => {
      const { container } = renderPageWithProps();
      expect(container).toHaveTextContent('마법사주방');
    });

    it('renders review write form', () => {
      const { queryByLabelText } = renderPageWithProps();
      expect(queryByLabelText('평점')).not.toBeNull();
    });
  });

  context('without params.id', () => {
    function renderPageWithoutProps() {
      // url: .../restaurants/1
      return render(
        <MemoryRouter initialEntries={['/restaurants/1']}>
          <RestaurantPage />
        </MemoryRouter>,
      );
    }

    it('renders restaurant', () => {
      const { container } = renderPageWithoutProps();
      expect(container).toHaveTextContent('마법사주방');
    });

    it('renders review write form', () => {
      const { queryByLabelText } = renderPageWithoutProps();

      expect(queryByLabelText('평점')).not.toBeNull();
    });
  });
});
