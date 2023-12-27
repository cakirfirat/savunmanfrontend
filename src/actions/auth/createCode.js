import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_CREATECODE_FULFILLED = "FETCH_CREATECODE_FULFILLED";
export const FETCH_CREATECODE_REJECTED = "FETCH_CREATECODE_REJECTED";
export const FETCH_CREATECODE_PENDING = "FETCH_CREATECODE_PENDING";
export const RESET_CREATECODE = "RESET_CREATECODE";

export function createCode(phoneNumber) {
  return (dispatch) => {
    dispatch({
      type: "FETCH_CREATECODE",
      payload: axios({
        method: "post",
        url: `${API_BASE}/api/create-code`,
        data: { phoneNumber },
        headers: {
          "Accept-Language": "tr-tr",
          "Content-Type": "application/json",
        },
      }).then((result) => result.data),
    });
  };
}

export function resetCreateCOde() {
  return (dispatch) => {
    dispatch({
      type: "RESET_CREATECODE",
    });
  };
}
