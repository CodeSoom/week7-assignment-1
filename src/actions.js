import {
  fetchRegions,
  fetchCategories,
  fetchRestaurants,
  fetchRestaurant,
  postLogin,
  postReview,
} from './services/api';
import { saveItemToLocalStorage } from './services/storage';

// set
export function setRegions(regions) {
  return {
    type: 'setRegions',
    payload: { regions },
  };
}

export function setCategories(categories) {
  return {
    type: 'setCategories',
    payload: { categories },
  };
}

export function setRestaurants(restaurants) {
  return {
    type: 'setRestaurants',
    payload: { restaurants },
  };
}

export function setRestaurant(restaurant) {
  return {
    type: 'setRestaurant',
    payload: { restaurant },
  };
}

export function setAccessToken(accessToken) {
  return {
    type: 'setAccessToken',
    payload: { accessToken },
  };
}

export function setReviews(reviews) {
  return {
    type: 'setReviews',
    payload: { reviews },
  };
}

// select
export function selectRegion(regionId) {
  return {
    type: 'selectRegion',
    payload: { regionId },
  };
}

export function selectCategory(categoryId) {
  return {
    type: 'selectCategory',
    payload: { categoryId },
  };
}

// change
export function changeLoginField({ name, value }) {
  return {
    type: 'changeLoginField',
    payload: { name, value },
  };
}

export function changeReviewField({ name, value }) {
  return {
    type: 'changeReviewField',
    payload: { name, value },
  };
}

// logout
export function logout() {
  return {
    type: 'logout',
  };
}

// clear
export function clearReviewFields() {
  return {
    type: 'clearReviewFields',
  };
}

// thunk load
export function loadInitialData() {
  return async (dispatch) => {
    const regions = await fetchRegions();
    dispatch(setRegions(regions));

    const categories = await fetchCategories();
    dispatch(setCategories(categories));
  };
}

export function loadRestaurants() {
  return async (dispatch, getState) => {
    const {
      selectedRegion: region,
      selectedCategory: category,
    } = getState();

    if (!region || !category) {
      return;
    }

    const restaurants = await fetchRestaurants({
      regionName: region.name,
      categoryId: category.id,
    });
    dispatch(setRestaurants(restaurants));
  };
}

export function loadRestaurant({ restaurantId }) {
  return async (dispatch) => {
    dispatch(setRestaurant(null));

    const restaurant = await fetchRestaurant({ restaurantId });

    dispatch(setRestaurant(restaurant));
  };
}

export function loadReview({ restaurantId }) {
  return async (dispatch) => {
    const restaurant = await fetchRestaurant({ restaurantId });

    // NOTE: UX면에서 리뷰같은경우 로딩이 돌지 않기 때문에 굳이 로딩 처리를 해주지 않는다
    dispatch(setReviews(restaurant.reviews));
  };
}

// thunk request
export function requestLogin() {
  return async (dispatch, getState) => {
    const { loginFields: { email, password } } = getState();

    const accessToken = await postLogin({ email, password });

    saveItemToLocalStorage('accessToken', accessToken);

    dispatch(setAccessToken(accessToken));
  };
}

// thunk send
export function sendReview(restaurantId) {
  return async (dispatch, getState) => {
    const { accessToken, reviewFields: { score, description } } = getState();

    // NOTE: reviewFields들을 초기화시키는 3가지 방법

    // 1. 먼저 지운다

    await postReview({
      accessToken, restaurantId, score, description,
    });

    // 2. 완료가 되면 지운다

    dispatch(loadReview({ restaurantId }));

    // 3. 업데이트되고 지운다
    dispatch(clearReviewFields());
  };
}
