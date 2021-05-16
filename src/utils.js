export function get(key) {
  return (obj) => obj[key];
}

export function equal(key, value) {
  return (obj) => obj[key] === value;
}

export function isNewRestaurant(id, newId) {
  return id !== Number(newId);
}
