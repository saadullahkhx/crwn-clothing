import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  errorMessage: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  if (action.type === userActionTypes.SIGNIN_SUCCESS) {
    return {
      ...state,
      currentUser: action.payload,
      errorMessage: null,
    };
  }
  if (action.type === userActionTypes.SIGN_OUT_SUCCESS) {
    return {
      ...state,
      currentUser: null,
      errorMessage: null,
    };
  }
  if (
    action.type === userActionTypes.SIGNIN_FAILURE ||
    action.type === userActionTypes.SIGN_OUT_FAILURE ||
    action.type === userActionTypes.SIGN_UP_FAILURE
  ) {
    return {
      ...state,
      currentUser: null,
      errorMessage: action.payload,
    };
  } else {
    return state;
  }
};

export default userReducer;
