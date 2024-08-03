import axios from "axios";

export const signup = async (data) => {
  try {
    const res = await axios.post(`api/users/signup/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 201) {
      return res;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
