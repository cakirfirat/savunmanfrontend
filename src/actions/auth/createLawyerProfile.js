import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_CREATELAWYERPROFILE_FULFILLED =
  "FETCH_CREATELAWYERPROFILE_FULFILLED";
export const FETCH_CREATELAWYERPROFILE_REJECTED =
  "FETCH_CREATELAWYERPROFILE_REJECTED";
export const FETCH_CREATELAWYERPROFILE_PENDING =
  "FETCH_CREATELAWYERPROFILE_PENDING";
export const RESET_CREATELAWYERPROFILE = "RESET_CREATELAWYERPROFILE";

export function createLawyerProfile(
  lawOfficeId,
  universityName,
  graduationYear,
  barAssociation,
  barRegisterNo,
  spetialization,
  dateOfLawyerLicance
) {
  return (dispatch) => {
    dispatch({
      type: "FETCH_CREATELAWYERPROFILE",
      payload: axios({
        method: "post",
        url: `${API_BASE}/api/profile/attorney-at-law/add`,
        data: {
          lawOfficeId,
          universityName,
          graduationYear,
          barAssociation,
          barRegisterNo,
          spetialization,
          dateOfLawyerLicance,
        },
        headers: {
          "Accept-Language": "tr-tr",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }).then((result) => result.data),
    });
  };
}

export function resetCreateLawyerProfile() {
  return (dispatch) => {
    dispatch({
      type: "RESET_CREATELAWYERPROFILE",
    });
  };
}
