import { loadFromLocalStorage } from "../Utility/localStorage";

/**
 * Retrieves data by using a GET api request
 * @param {object} url Endpoint
 * @returns {Promise} Response data from api
 */
export const getData = async (url) => {
  let response;
  const token = loadFromLocalStorage("token");
  if (token) {
    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    response = await fetch(url);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `API request failed with http status code ${response.status} because '${data.errors[0].message}'`
    );
  }

  return data;
};
