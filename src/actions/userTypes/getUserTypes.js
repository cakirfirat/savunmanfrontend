import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_GETUSERTYPES_FULFILLED = "FETCH_GETUSERTYPES_FULFILLED";
export const FETCH_GETUSERTYPES_REJECTED = "FETCH_GETUSERTYPES_REJECTED";
export const FETCH_GETUSERTYPES_PENDING = "FETCH_GETUSERTYPES_PENDING";
export const RESET_GETUSERTYPES = "RESET_GETUSERTYPES";

export function getUserTypes(phoneNumber) {
  return (dispatch) => {
    dispatch({
      type: "FETCH_GETUSERTYPES",
      payload: axios({
        method: "get",
        url: `${API_BASE}/usertype/get`,
        data: { phoneNumber },
        headers: {
          "Accept-Language": "tr-tr",
          "Content-Type": "application/json",
        },
      }).then((result) => result.data),
    });
  };
}

export function resetUserTypes() {
  return (dispatch) => {
    dispatch({
      type: "RESET_GETUSERTYPES",
    });
  };
}
