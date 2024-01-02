import {
  /** FETCH PROFESSIONS  */
  FETCH_VERIFYCODE_FULFILLED,
  FETCH_VERIFYCODE_REJECTED,
  FETCH_VERIFYCODE_PENDING,
  RESET_VERIFYCODE,
  LOGOUT,
} from "../../actions/auth/verifyCode";
const token = localStorage.getItem("accessToken");
const initialState = token
  ? {
      done: false,
      error: false,
      spinner: false,
      isLogin: true,
    }
  : {
      done: false,
      error: false,
      spinner: false,
      isLogin: false,
    };
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VERIFYCODE_PENDING:
      return {
        done: false,
        error: false,
        spinner: true,
        isLogin: false,
      };
    case FETCH_VERIFYCODE_FULFILLED:
      localStorage.setItem("accessToken", action.payload.result.accessToken);
      return {
        ...state,
        verifyCode: action.payload,
        done: true,
        error: false,
        spinner: false,
        isLogin: true,
      };
    case FETCH_VERIFYCODE_REJECTED:
      return {
        ...state,
        error: action.payload,
        done: false,
        spinner: false,
        isLogin: false,
      };
    case RESET_VERIFYCODE:
      return {
        error: false,
        done: false,
        isLogin: false,
      };
    case LOGOUT:
      return {
        error: false,
        done: false,
        isLogin: false,
      };
    default:
      return state;
  }
};
