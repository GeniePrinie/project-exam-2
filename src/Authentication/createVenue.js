import { postData } from "../Api/postData";
import { API_BASE_URL } from "../Utility/constants";

/**
 * Creates a new user by using a POST api request
 * @param {object} body User profile
 * @returns {Promise} Response data from api
 */
export async function createVenue(body) {
  try {
    const data = await postData(`${API_BASE_URL}/venues`, body);
    return data;
  } catch (error) {
    console.error(error); // TODO: Modal error
    throw error; // Rethrow the error to maintain consistency
  }
}
