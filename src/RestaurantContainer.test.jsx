import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import given from 'given2';

import RestaurantContainer from './RestaurantContainer';

describe('RestaurantContainer', () => {
  const dispatch = jest.fn();

  function renderRestaurantContainer() {
    return render(<RestaurantContainer restaurantId="1" />);
  }

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      restaurant: given.restaurant,
      reviewFields: {
        score: '',
        description: '',
      },
      accessToken: given.accessToken,
    }));
  });

  it('dispatches action', () => {
    renderRestaurantContainer();

    expect(dispatch).toBeCalled();
  });

  context('with restaurant', () => {
    given('restaurant', () => ({
      id: 1,
      name: '마법사주방',
      address: '서울시 강남구',
      reviews: [],
    }));

    it('renders name and address', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('마법사주방');
      expect(container).toHaveTextContent('서울시');
    });

    // 질문1: logged out일 때는 ui 테스팅이 되버려서 따로 넣지는 않았습니다. 트레이너님은 이런 상황에 어떻게 하시나요?
    // 질문2: useEffect안의 loadRestaurant때문에 toBeCalledWith는 사용하지 못하는 상황입니다. toBeCalledTimes만으로 적당할까요?
    context('when logged in', () => {
      beforeEach(() => {
        given('accessToken', () => 'ACCESS_TOKEN');
      });

      it('listens click event', () => {
        const { getByRole } = renderRestaurantContainer();

        fireEvent.click(getByRole('button', { name: '리뷰 남기기' }));

        expect(dispatch).toBeCalledTimes(2);
      });

      it('listens change event', () => {
        const { getByLabelText } = renderRestaurantContainer();

        const controls = [
          { label: '평점' },
          { label: '리뷰 내용' },
        ];

        controls.forEach(({ label }) => {
          fireEvent.change(getByLabelText(label), { target: { value: 2 } });
        });

        expect(dispatch).toBeCalledTimes(controls.length + 1);
      });
    });
  });

  context('without restaurant', () => {
    given('restaurant', () => null);

    it('renders loading', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('Loading');
    });
  });
});
