import reducer, { initialState as defaultState } from './reducer';

import {
  setRegions,
  setCategories,
  setRestaurants,
  setRestaurant,
  selectRegion,
  selectCategory,
  changeLoginField,
  setAccessToken,
  changeReviewField,
  logout,
  setReviews,
  clearReviewFields,
} from './actions';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = defaultState;

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRegions', () => {
    it('changes regions', () => {
      const initialState = {
        regions: [],
      };

      const regions = [
        { id: 1, name: '서울' },
      ];

      const state = reducer(initialState, setRegions(regions));

      expect(state.regions).toHaveLength(1);
    });
  });

  describe('setCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: [],
      };

      const categories = [
        { id: 1, name: '한식' },
      ];

      const state = reducer(initialState, setCategories(categories));

      expect(state.categories).toHaveLength(1);
    });
  });

  describe('setRestaurants', () => {
    it('changes restaurants', () => {
      const initialState = {
        restaurants: [],
      };

      const restaurants = [
        { id: 1, name: '마법사주방' },
      ];

      const state = reducer(initialState, setRestaurants(restaurants));

      expect(state.restaurants).toHaveLength(1);
    });
  });

  describe('setRestaurant', () => {
    it('changes restaurant', () => {
      const initialState = {
        restaurant: null,
      };

      const restaurant = { id: 1, name: '마법사주방' };

      const state = reducer(initialState, setRestaurant(restaurant));

      expect(state.restaurant.id).toBe(1);
      expect(state.restaurant.name).toBe('마법사주방');
    });
  });

  describe('setReviews', () => {
    it('changes reviews of the current restaurant', () => {
      const initialState = {
        restaurant: {
          reviews: [],
        },
      };

      const reviews = [{
        id: 1, name: '테스터', description: '맛있어요', score: '5',
      }];

      const state = reducer(initialState, setReviews(reviews));

      expect(state.restaurant.reviews).toHaveLength(reviews.length);
      expect(state.restaurant.reviews[0]).toEqual(reviews[0]);
    });
  });

  describe('selectRegion', () => {
    it('changes selected region', () => {
      const initialState = {
        regions: [
          { id: 1, name: '서울' },
        ],
        selectedRegion: null,
      };

      const state = reducer(initialState, selectRegion(1));

      expect(state.selectedRegion).toEqual({
        id: 1,
        name: '서울',
      });
    });
  });

  describe('selectCategory', () => {
    it('changes selected category', () => {
      const initialState = {
        categories: [
          { id: 1, name: '한식' },
        ],
        selectedCategory: null,
      };

      const state = reducer(initialState, selectCategory(1));

      expect(state.selectedCategory).toEqual({
        id: 1,
        name: '한식',
      });
    });
  });

  describe('setAccessToken', () => {
    it('change acessToken', () => {
      const initialState = {
        accessToken: '',
      };

      const state = reducer(initialState, setAccessToken('TOKEN'));
      expect(state.accessToken).toBe('TOKEN');
    });
  });

  describe('logout', () => {
    it('change acessToken', () => {
      const initialState = {
        accessToken: 'ACCESS_TOKEN',
      };

      const state = reducer(initialState, logout());
      expect(state.accessToken).toBe('');
    });
  });

  describe('changeLoginField', () => {
    context('when email is changed', () => {
      it('changes input value', () => {
        const initialState = {
          loginFields: {
            email: 'test@test',
            password: '1234',
          },
        };

        const state = reducer(
          initialState,
          changeLoginField({ name: 'email', value: 'test@test' }),
        );

        expect(state.loginFields.email).toBe('test@test');
        expect(state.loginFields.password).toBe('1234');
      });
    });
  });

  describe('changeReviewField', () => {
    context('when review rate is changed', () => {
      it('changes input value', () => {
        const initialState = {
          reviewFields: {
            score: '',
            description: '',
          },
        };

        const state = reducer(
          initialState,
          changeReviewField({ name: 'score', value: '5' }),
        );

        expect(state.reviewFields.score).toBe('5');
      });
    });
  });

  describe('clearReviewFields', () => {
    it('clears fields of review', () => {
      const initialState = {
        reviewFields: { score: '4', description: 'good' },
      };

      const state = reducer(initialState, clearReviewFields());

      expect(state.reviewFields.score).toBe('');
      expect(state.reviewFields.description).toBe('');
    });
  });
});
