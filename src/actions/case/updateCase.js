import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_UPDATECASE_FULFILLED =
    "FETCH_UPDATECASE_FULFILLED";
export const FETCH_UPDATECASE_REJECTED =
    "FETCH_UPDATECASE_REJECTED";
export const FETCH_UPDATECASE_PENDING =
    "FETCH_UPDATECASE_PENDING";
export const RESET_UPDATECASE = "RESET_UPDATECASE";

export function updateCase(id, description, status, startDate, endDate, caseType) {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_UPDATECASE",
            payload: axios({
                method: "put",
                url: `${API_BASE}/api/case/update`,
                data: { id, description, status, startDate, endDate, caseType },
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetUpdateCase() {
    return (dispatch) => {
        dispatch({
            type: "RESET_UPDATECASE",
        });
    };
}
