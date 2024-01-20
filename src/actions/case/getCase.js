import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_GETCASE_FULFILLED =
    "FETCH_GETCASE_FULFILLED";
export const FETCH_GETCASE_REJECTED =
    "FETCH_GETCASE_REJECTED";
export const FETCH_GETCASE_PENDING =
    "FETCH_GETCASE_PENDING";
export const RESET_GETCASE = "RESET_GETCASE";

export function getCase(id) {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_GETCASE",
            payload: axios({
                method: "get",
                url: `${API_BASE}/api/case/get/${id}`,
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetGetCase() {
    return (dispatch) => {
        dispatch({
            type: "RESET_GETCASE",
        });
    };
}
