import { MemoryRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import given from 'given2';

import RestaurantPage from './RestaurantPage';

describe('RestaurantPage', () => {
  beforeEach(() => {
    const dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((state) => state({
      restaurant: {
        id: 1,
        name: '마법사주방',
        address: '서울시 강남구',
        reviews: [],
      },
      reviewFields: {
        score: '',
        description: '',
      },
      accessToken: given.accessToken,
    }));
  });

  function renderRestaurantPage(params) {
    return render(
      <RestaurantPage params={params} />,
    );
  }

  context('with params props', () => {
    it('renders name', () => {
      const { container } = renderRestaurantPage({ id: 1 });

      expect(container).toHaveTextContent('마법사주방');
    });
  });

  // 질문: 이 부분은 Route를 사용하지 않는 컴포넌트이기 때문에 만약 테스트를 한다면
  // jest.mock('react-router');를 사용하여 useParams.mockImplementation(() => { id: 1 }); 로 하는 것이
  // 좀 더 적절하지 않나 질문드립니다.
  context('without params props', () => {
    it('renders name', () => {
      const { container } = render(
        <MemoryRouter initialEntries={['/restaurants/1']}>
          <RestaurantPage />
        </MemoryRouter>,
      );

      expect(container).toHaveTextContent('마법사주방');
    });
  });

  context('when logged in', () => {
    // 질문: 의미상 beforeEach에 given을 넣는 것이 맞는 것 같은데 트레이너님 생각은 어떠신가요?
    beforeEach(() => {
      given('accessToken', () => 'ACCESS_TOKEN');
    });

    it("renders '리뷰 남기기' button", () => {
      const { getByRole } = renderRestaurantPage({ id: 1 });

      expect(getByRole('button', { name: '리뷰 남기기' })).toBeInTheDocument();
    });
  });

  context('when logged out', () => {
    beforeEach(() => {
      given('accessToken', () => '');
    });

    it("doesn't renders '리뷰 남기기' button", () => {
      const { queryByRole } = renderRestaurantPage({ id: 1 });

      expect(queryByRole('button', { name: '리뷰 남기기' })).not.toBeInTheDocument();
    });
  });
});
