/**
 * Saves data to local storage
 * @param {string} key Local storage key
 * @param {any} value Local storage value
 */
export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Gets data from local storage based on key
 * @param {string} key Local storage key
 */
export function loadFromLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Removes data from local storage based on key
 * @param {string} key Local storage key
 */
export function removeFromLocalStorage() {
  localStorage.clear();
  window.location.href = "/";
}
