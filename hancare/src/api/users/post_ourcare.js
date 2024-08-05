import axios from "axios";
import { baseURL } from "../baseURL";

export const post_ourcare = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/users/ourcare/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
