import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_GENESIS_FULFILLED = "FETCH_GENESIS_FULFILLED";
export const FETCH_GENESIS_REJECTED = "FETCH_GENESIS_REJECTED";
export const FETCH_GENESIS_PENDING = "FETCH_GENESIS_PENDING";
export const RESET_GENESIS = "RESET_GENESIS";

export function genesis(
  name,
  surname,
  tckn,
  email,
  phoneNumber,
  address,
  userTypeId,
  profileType,
  photoUrl,
  invitationCode
) {
  return (dispatch) => {
    dispatch({
      type: "FETCH_GENESIS",
      payload: axios({
        method: "post",
        url: `${API_BASE}/api/genesis`,
        data: {
          name,
          surname,
          tckn,
          email,
          phoneNumber,
          address,
          userTypeId,
          profileType,
          photoUrl,
          invitationCode,
        },
        headers: {
          "Accept-Language": "tr-tr",
          "Content-Type": "application/json",
        },
      }).then((result) => result.data),
    });
  };
}

export function resetGenesis() {
  return (dispatch) => {
    dispatch({
      type: "RESET_GENESIS",
    });
  };
}
