import { fireEvent, render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import RestaurantsContainer from './RestaurantsContainer';

describe('RestaurantsContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    restaurants: [
      { id: 1, name: '마법사주방' },
    ],
  }));

  const handleClick = jest.fn();

  it('renders restaurants list', () => {
    const { container, getByText } = render(
      <RestaurantsContainer onClickRestaurant={handleClick} />,
    );

    expect(container).toHaveTextContent('마법사주방');
    fireEvent.click(getByText('마법사주방'));
    expect(handleClick).toBeCalled();
  });
});
