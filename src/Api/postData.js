import { loadFromLocalStorage } from "../Utility/localStorage";

/**
 * Creates data by using a POST api request
 * @param {object} url Endpoint
 * @param {object} body Request body
 * @returns {Promise} Response data from api
 */
export const postData = async (url, body) => {
  let response;
  const token = loadFromLocalStorage("token");
  if (token) {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loadFromLocalStorage("token")}`,
      },
      body: JSON.stringify(body),
    });
  } else {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `API request failed with http status code ${response.status} because '${data.errors[0].message}'`
    );
  }

  return data;
};
