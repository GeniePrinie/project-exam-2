/**
 * Saves data to local storage
 * @param {string} key Local storage key
 * @param {any} value Local storage value
 */
export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Gets data from local storage based on key
 * @param {string} key Local storage key
 */
export const loadFromLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
};

/**
 * Removes data from local storage based on key
 * @param {string} key Local storage key
 */
export const removeFromLocalStorage = () => {
  localStorage.clear();
  window.location.href = "/";
};
