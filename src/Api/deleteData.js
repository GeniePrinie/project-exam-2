import { loadFromLocalStorage } from "../Utility/localStorage";

/**
 * Deletes data by using a DELETE api request
 * @param {string} url Endpoint with the id to be deleted
 * @returns {Promise} Response data from api
 */
export const deleteData = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loadFromLocalStorage("token")}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(
      `API request failed with http status code ${response.status} because '${data.errors[0].message}'`
    );
  }
};
