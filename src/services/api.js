export async function fetchRegions() {
  const url = 'https://eatgo-customer-api.ahastudio.com/regions';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchCategories() {
  const url = 'https://eatgo-customer-api.ahastudio.com/categories';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurants({ regionName, categoryId }) {
  const url = 'https://eatgo-customer-api.ahastudio.com/restaurants'
    + `?region=${regionName}&category=${categoryId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchRestaurant({ restaurantId }) {
  const url = 'https://eatgo-customer-api.ahastudio.com'
    + `/restaurants/${restaurantId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function postLogin({ email, password }) {
  const url = 'https://eatgo-login-api.ahastudio.com/session';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const { accessToken } = await response.json();
  return accessToken;
}
