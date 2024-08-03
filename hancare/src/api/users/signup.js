import axios from "axios";
import { baseURL } from "../baseURL";

export const signup = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/users/signup/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
