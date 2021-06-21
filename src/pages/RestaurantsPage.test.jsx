import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import RestaurantsPage from './RestaurantsPage';

jest.mock('react-redux');
jest.mock('../services/api');

describe('RestaurantsPage', () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      regions: [{ id: 1, name: '서울' }],
      categories: [{ id: 1, name: '한식' }],
      restaurants: [{ id: 1, name: '마녀주방' }],
    }));
  });

  function renderRestaurantsPage() {
    return render(
      <MemoryRouter>
        <RestaurantsPage />
      </MemoryRouter>,
    );
  }

  it('renders region and category select buttons', () => {
    const { getByText } = renderRestaurantsPage();

    expect(getByText('서울')).not.toBeNull();
    expect(getByText('한식')).not.toBeNull();
    expect(getByText('마녀주방')).not.toBeNull();
    expect(dispatch).toBeCalledTimes(1);
  });

  it('renders links of restaurants', () => {
    const { container } = renderRestaurantsPage();

    expect(container.innerHTML).toContain('<a href');
  });

  it('renders restaurant link & listens event', async () => {
    const { getByText } = renderRestaurantsPage();

    expect(getByText('마녀주방')).not.toBeNull();
    fireEvent.click(getByText('마녀주방'));
    // todo : 링크 이동한것 체크 (histor) : 클릭이벤트 발생한 것에 대해 커버 필요
  });
});
