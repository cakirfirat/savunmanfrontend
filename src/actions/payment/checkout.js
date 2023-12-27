import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_CHECKOUT_FULFILLED =
  "FETCH_CHECKOUT_FULFILLED";
export const FETCH_CHECKOUT_REJECTED =
  "FETCH_CHECKOUT_REJECTED";
export const FETCH_CHECKOUT_PENDING =
  "FETCH_CHECKOUT_PENDING";
export const RESET_CHECKOUT = "RESET_CHECKOUT";

export function checkout() {
  return (dispatch) => {
    dispatch({
      type: "FETCH_CHECKOUT",
      payload: axios({
        method: "post",
        url: `${API_BASE}/api/checkout`,
        data: {},
        headers: {
          "Accept-Language": "tr-tr",
          "Content-Type": "application/json",
        },
      }).then((result) => result.data),
    });
  };
}

export function resetCheckout() {
  return (dispatch) => {
    dispatch({
      type: "RESET_CHECKOUT",
    });
  };
}
