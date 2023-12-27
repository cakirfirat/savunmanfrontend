import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_CREATEENTERPRISEPROFILE_FULFILLED =
  "FETCH_CREATEENTERPRISEPROFILE_FULFILLED";
export const FETCH_CREATEENTERPRISEPROFILE_REJECTED =
  "FETCH_CREATEENTERPRISEPROFILE_REJECTED";
export const FETCH_CREATEENTERPRISEPROFILE_PENDING =
  "FETCH_CREATEENTERPRISEPROFILE_PENDING";
export const RESET_CREATEENTERPRISEPROFILE = "RESET_CREATEENTERPRISEPROFILE";

export function createEnterpriseProfile(
  name,
  dateOfEstablishment,
  address,
  tradeRegistryNumber,
  companyPhoneNumber,
  companyEmail
) {
  return (dispatch) => {
    dispatch({
      type: "FETCH_CREATEENTERPRISEPROFILE",
      payload: axios({
        method: "post",
        url: `${API_BASE}/api/profile/law-office/add`,
        data: {
          name,
          dateOfEstablishment,
          address,
          tradeRegistryNumber,
          companyPhoneNumber,
          companyEmail,
        },
        headers: {
          "Accept-Language": "tr-tr",
          "Content-Type": "application/json",
        },
      }).then((result) => result.data),
    });
  };
}

export function resetCreateEnterpriseProfile() {
  return (dispatch) => {
    dispatch({
      type: "RESET_CREATEENTERPRISEPROFILE",
    });
  };
}
