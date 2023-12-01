/**
 * Converts any date into a string in ISO standard
 * @param {Date} date Date object
 * @returns {string} String in ISO format
 */
export const convertToIsoDateInString = (date) => {
  if (!date) return null;
  // Set hours to something else than midnight, to not get a day difference in conversion between GMT+0100 and UTC
  date.setHours(1);
  return date.toISOString().split("T")[0];
};

/**
 * Converts any date into a string in ISO standard that looks good for output
 * @param {Date} date Date object
 * @returns {string} String in ISO format with european style
 */
export const convertFromDateToIsoOutput = (date) => {
  if (!date) return null;
  // Set hours to something else than midnight, to not get a day difference in conversion between GMT+0100 and UTC
  date.setHours(1);
  return `${date.getUTCDate()}.${
    date.getUTCMonth() + 1
  }.${date.getUTCFullYear()}`;
};

/**
 * Converts any date into a string in ISO standard that looks good for output
 * @param {Date} date Date object
 * @returns {string} String in ISO format with european style
 */
export const convertFromStringToIsoOutput = (date) => {
  if (!date) return null;
  const [year, month, day] = date.slice(0, 10).split("-");
  // Create the desired format
  return `${day}.${month}.${year}`;
};
