import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RegionsContainer from './RegionsContainer';

describe('RegionsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      regions: [
        { id: 1, name: '서울' },
        { id: 2, name: '부산' },
      ],
      selectedRegion: { id: 1, name: '서울' },
    }));
  });

  it('renders checked regions', () => {
    const { container, getByText } = render((
      <RegionsContainer />
    ));

    expect(container).toHaveTextContent('서울(V)');
    expect(container).toHaveTextContent('부산');

    fireEvent.click(getByText('부산'));

    expect(dispatch).toBeCalled();
  });
});
