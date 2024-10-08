export const setUsername = (username) => ({
  type: "SET_USERNAME",
  payload: username,
});

const initialState = {
  username: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
