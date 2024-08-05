import axios from "axios";
import { baseURL } from "./baseURL";

export const getuserData = async (username) => {
  try {
    const response = await axios.get(
      `${baseURL}/users/profile?username=${username}`
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
