export async function fetchRegions() {
  return [];
}

export async function fetchCategories() {
  return [];
}

export async function fetchRestaurants() {
  return [];
}

export async function fetchRestaurant({ restaurantId }) {
  return { id: restaurantId };
}

export async function postLogin({ email, password }) {
  const accessToken = 'TOKEN';
  return { accessToken, email, password };
}

export async function postReview({
  accessToken, restaurantId, score, description,
}) {
  const success = true;
  return {
    success,
    accessToken,
    restaurantId,
    score,
    description,
  };
}
