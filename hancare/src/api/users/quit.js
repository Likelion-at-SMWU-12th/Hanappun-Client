import axios from "axios";
import { baseURL } from "../baseURL";

export const quit = async (json) => {
  try {
    const res = await axios.delete(`${baseURL}/users/quit`, {
      data: json,
    });

    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};
