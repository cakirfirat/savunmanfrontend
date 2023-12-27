import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_VERIFYCODE_FULFILLED = "FETCH_VERIFYCODE_FULFILLED";
export const FETCH_VERIFYCODE_REJECTED = "FETCH_VERIFYCODE_REJECTED";
export const FETCH_VERIFYCODE_PENDING = "FETCH_VERIFYCODE_PENDING";
export const RESET_VERIFYCODE = "RESET_VERIFYCODE";
export const LOGOUT = "LOGOUT";

export function verifyCode(phoneNumber, verifyCode) {
  return (dispatch) => {
    dispatch({
      type: "FETCH_VERIFYCODE",
      payload: axios({
        method: "post",
        url: `${API_BASE}/api/verify-code`,
        data: { phoneNumber, verifyCode },
        headers: {
          "Accept-Language": "tr-tr",
          "Content-Type": "application/json",
        },
      }).then((result) => result.data),
    });
  };
}

export function resetVerifyCode() {
  return (dispatch) => {
    dispatch({
      type: "RESET_VERIFYCODE",
    });
  };
}

export function logout() {
  sessionStorage.clear();
  localStorage.clear();
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
}
