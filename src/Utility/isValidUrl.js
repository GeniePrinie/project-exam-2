/**
 * Checks if an input string is in valid url format
 * @param {string} url A url that needs to be validated
 * @returns {bool} If url is valid or not
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
