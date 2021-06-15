import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CategoriesContainer from './CategoriesContainer';

describe('CategoriesContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      categories: [
        { id: 1, name: '한식' },
        { id: 2, name: '양식' },
      ],
      selectedCategory: { id: 1, name: '한식' },
    }));
  });

  it('renders regions and checked symbol', () => {
    const { container, getByText } = render((
      <CategoriesContainer />
    ));

    expect(container).toHaveTextContent('한식(V)');
    expect(container).toHaveTextContent('양식');

    fireEvent.click(getByText('양식'));

    expect(dispatch).toBeCalled();
  });
});
