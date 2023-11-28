import { loadFromLocalStorage } from "../Utility/localStorage";

/**
 * Changes data by using a PUT api request
 * @param {object} url Endpoint
 * @param {object} body Request body
 * @returns {Promise} Response data from api
 */
export const putData = async (url, body) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loadFromLocalStorage("token")}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `API request failed with http status code ${response.status} because '${data.errors[0].message}'`
    );
  }

  return data;
};
