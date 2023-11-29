/**
 * Converts any date into a string in ISO standard
 * @param {Date} date Date object
 * @returns {string} String in ISO format
 */
export const convertToIsoDate = (date) => {
  if (!date) return null;
  return date.toISOString().split("T")[0];
};
