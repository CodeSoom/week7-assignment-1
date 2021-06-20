export function saveItemToLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}

export function loadItemToLocalStorage(key) {
  return localStorage.getItem(key);
}
