import reducer, { initialReviewFields } from './reducer';

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
    const initialState = {
      regions: [],
      categories: [],
      restaurants: [],
      restaurant: null,
      selectedRegion: null,
      selectedCategory: null,
      loginFields: {
        email: '',
        password: '',
      },
      reviewFields: {
        score: '',
        description: '',
      },
      accessToken: null,
    };

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

  describe('changeLoginField', () => {
    it('changes email and keeps remaining value', () => {
      const initialState = {
        loginFields: {
          email: '',
          password: '',
        },
      };

      const state = reducer(initialState, changeLoginField({
        name: 'email',
        value: 'test@test.com',
      }));

      const { loginFields: { email, password } } = state;

      expect(email).toBe('test@test.com');
      expect(password).toBe('');
    });
  });

  describe('setAccessToken', () => {
    it('changes access token', () => {
      const initialState = {
        accessToken: null,
      };

      const { accessToken } = reducer(initialState, setAccessToken('aabbccdd'));

      expect(accessToken).toBe('aabbccdd');
    });
  });

  describe('setReviews', () => {
    it('changes reviews of the current restaurant', () => {
      const reviews = [
        {
          id: 1,
          name: '테스터',
          score: 5,
          description: '훌륭하다 훌륭하다 지구인놈들',
        },
        {
          id: 2,
          name: '동우',
          score: 1,
          description: '배탈남',
        },
      ];

      const initialState = {
        restaurant: {
          reviews: [],
        },
      };

      const state = reducer(initialState, setReviews(reviews));

      // 자세하게 하고 싶으면 toEqual같은 것들도 사용가능
      expect(state.restaurant.reviews).toHaveLength(reviews.length);
    });
  });

  describe('changeReviewField', () => {
    it('changes score and keeps remaining value', () => {
      const initialState = {
        reviewFields: {
          score: '',
          description: '',
        },
      };

      const state = reducer(initialState, changeReviewField({
        name: 'score',
        value: '5',
      }));

      const { reviewFields: { score, description } } = state;

      expect(score).toBe('5');

      expect(description).toBe('');
    });
  });

  describe('logout', () => {
    it('changes access token and keeps remaining value', () => {
      const initialState = {
        accessToken: 'ACCESS_TOKEN',
        selectedCategory: null,
      };

      const { accessToken, selectedCategory } = reducer(initialState, logout());

      expect(accessToken).toBe('');

      expect(selectedCategory).toBeNull();
    });
  });

  describe('clearReviewFields', () => {
    it('clears fields of review and keeps remaining value', () => {
      const initialState = {
        reviewFields: {
          ...initialReviewFields,
        },
        selectedCategory: null,
      };

      const { reviewFields, selectedCategory } = reducer(initialState, clearReviewFields());

      Object.keys(reviewFields).forEach((reviewField) => {
        expect(reviewFields[reviewField]).toBe('');
      });

      expect(selectedCategory).toBeNull();
    });
  });
});
