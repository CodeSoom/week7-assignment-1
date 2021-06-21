import {
  fetchRegions,
  fetchCategories,
  fetchRestaurants,
  fetchRestaurant,
  postLogin,
  postReview,
} from '../services/api';
import { saveItem } from '../services/storage';

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

export function setReviews(reviews) {
  //
  return {
    type: 'setReviews',
    payload: { reviews },
  };
}

export function setAccessToken(accessToken) {
  return {
    type: 'setAccessToken',
    payload: { accessToken },
  };
}

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

export function clearReviewFields() {
  return {
    type: 'clearReviewFields',
  };
}
export function logout() {
  return {
    type: 'logout',
  };
}

/// 비동기 액션

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
    dispatch(setRestaurant(null)); // 통신하는 동안 빈페이지 보여주기
    const restaurant = await fetchRestaurant({ restaurantId });
    dispatch(setRestaurant(restaurant));
  };
}
export function loadReview({ restaurantId }) {
  // fetch restaurant 후 set Reviews (리뷰만 업데이트)
  return async (dispatch) => {
    const restaurant = await fetchRestaurant({ restaurantId });
    const { reviews } = restaurant;

    dispatch(setReviews(reviews));
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    // post email, password
    const {
      loginFields: { email, password },
    } = getState();

    try {
      const accessToken = await postLogin({ email, password });
      dispatch(setAccessToken(accessToken));
      // 로컬스토리지에 토큰 저장
      saveItem('accessToken', accessToken);
    } catch (e) {
      console.log('오류 : failed to get AccessToken ', e);
    }
  };
}

export function sendReview({ restaurantId }) {
  // 리뷰값 입력 내용은 언제 삭제해줄까?
  return async (dispatch, getState) => {
    const {
      accessToken,
      reviewFields: { score, description },
    } = getState();
    // 시점 1. postReview 전에 지운다.
    await postReview({
      accessToken,
      restaurantId,
      score,
      description,
    });

    // 시점 2. 리뷰 보내기가 완료되면 지운다.

    dispatch(loadReview({ restaurantId })); // 리뷰 등록시, 리뷰만 업데이트

    // 시점3. 업데이트가 완료되면 지운다
    dispatch(clearReviewFields());
  };
}
