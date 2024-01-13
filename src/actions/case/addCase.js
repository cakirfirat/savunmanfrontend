import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_ADDCASE_FULFILLED =
    "FETCH_ADDCASE_FULFILLED";
export const FETCH_ADDCASE_REJECTED =
    "FETCH_ADDCASE_REJECTED";
export const FETCH_ADDCASE_PENDING =
    "FETCH_ADDCASE_PENDING";
export const RESET_ADDCASE = "RESET_ADDCASE";

export function addCase(clientId, description, status, startDate, endDate, caseType) {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_ADDCASE",
            payload: axios({
                method: "post",
                url: `${API_BASE}/api/case/add`,
                data: { clientId, description, status, startDate, endDate, caseType },
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetAddCase() {
    return (dispatch) => {
        dispatch({
            type: "RESET_ADDCASE",
        });
    };
}
