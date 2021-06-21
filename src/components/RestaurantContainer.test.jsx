import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantContainer from './RestaurantContainer';

describe('RestaurantContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  context('without restaurant', () => {
    it('renders loading message', () => {
      const { container } = render(<RestaurantContainer restaurantId="1" />);

      expect(container).toHaveTextContent('Loading...');
    });
  });
  context('with restaurant', () => {
    beforeEach(() => {
      dispatch.mockClear();

      useSelector.mockImplementation((selector) => selector({
        restaurant: {
          id: 1,
          name: '마법사주방',
          address: '서울시 강남구',
          reviews: [{
            id: 1, name: '테스터', description: '맛있어요', score: '1',
          }],
        },
        reviewFields: { score: '', description: '' },
        accessToken: given.accessToken,
      }));
    });

    it('renders name and address', () => {
      const { container } = render(<RestaurantContainer restaurantId="1" />);

      expect(container).toHaveTextContent('마법사주방');
      expect(container).toHaveTextContent('서울시 강남구');
    });

    it('renders reviews', () => {
      const { container } = render(
        <RestaurantContainer restaurantId="1" />,
      );

      expect(container).toHaveTextContent('맛있어요');
    });

    context('without logged-in', () => {
      it('renders no review write field', () => {
        const { queryByLabelText } = render(
          <RestaurantContainer restaurantId="1" />,
        );

        expect(queryByLabelText('평점')).toBeNull();
        expect(queryByLabelText('리뷰내용')).toBeNull();
      });
    });

    context('with logged in', () => {
      // TODO: accessToken 셋팅 : given 2 라이브러리 사용
      given('accessToken', () => 'ACCESS_TOKEN');
      it('renders review write form ', () => {
        const { queryByLabelText } = render(
          <RestaurantContainer restaurantId="1" />,
        );

        expect(queryByLabelText('평점')).not.toBeNull();
        expect(queryByLabelText('리뷰내용')).not.toBeNull();
      });

      it('listens description change events', () => {
        const { getByLabelText } = render(
          <RestaurantContainer restaurantId="1" />,
        );

        const controls = [
          { label: '평점', name: 'score', value: '5' },
          { label: '리뷰내용', name: 'description', value: '정말 최고' },
        ];

        controls.forEach(({ label, name, value }) => {
          fireEvent.change(getByLabelText(label), { target: { value } });

          expect(dispatch).toBeCalledWith({
            type: 'changeReviewField',
            payload: { name, value },
          });
        });
      });

      it('renders "리뷰 남기기" button', () => {
        const { getByText } = render(<RestaurantContainer restaurantId="1" />);

        fireEvent.click(getByText('리뷰 남기기'));

        expect(dispatch).toBeCalledTimes(2);
        //! 왜 2번인가 :  RestaurantContainer에서 (useEffect 레스토랑 정보 조회시)
        //  dispatch가 1번 콜 되기 때문에, 2회로 카운트.
        // todo: mock store 라이브러리 사용으로 더 정확하게 테스트 작성가능
      });
    });
  });
});
