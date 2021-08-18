import initialState from "./user.initialState";
import actionTypes from "./user.actionTypes";

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_LOAD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case actionTypes.USER_LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };

    case actionTypes.USER_LOAD_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case actionTypes.USER_UNLOAD:
      localStorage.removeItem("token");
      return {
        ...state,
        data: null,
      };

    case actionTypes.USER_LOAD:
      const user = localStorage.getItem("token");
      return {
        ...state,
        data: user,
      };

    case actionTypes.USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
