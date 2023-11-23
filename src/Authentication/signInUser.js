import { API_BASE_URL } from "../Utility/constants";
import { saveToLocalStorage } from "../Utility/localStorage";

/**
 * Gets a bearer token by using a POST api request and saves it in local storage
 * @param {object} body User profile
 */
export async function signInUser(body) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `API request failed with http status code ${response.status}  because '${data.errors[0].message}'`
    );
  }

  const { accessToken, ...profile } = data;

  saveToLocalStorage("token", accessToken);
  saveToLocalStorage("profile", profile);

  return profile;
}
