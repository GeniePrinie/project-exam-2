import { API_BASE_URL } from "../Utility/constants";

/**
 * Creates a new user by using a POST api request
 * @param {object} body User profile
 * @returns {Promise} Response data from api
 */
export async function signUpUser(body) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `API request failed with http status code ${response.status} because '${data.errors[0].message}'`
    );
  }

  return data;
}
