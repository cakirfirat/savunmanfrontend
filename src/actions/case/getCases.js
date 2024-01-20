import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_GETCASES_FULFILLED =
    "FETCH_GETCASES_FULFILLED";
export const FETCH_GETCASES_REJECTED =
    "FETCH_GETCASES_REJECTED";
export const FETCH_GETCASES_PENDING =
    "FETCH_GETCASES_PENDING";
export const RESET_GETCASES = "RESET_GETCASES";

export function getCases() {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_GETCASES",
            payload: axios({
                method: "get",
                url: `${API_BASE}/api/case/get`,
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetGetCases() {
    return (dispatch) => {
        dispatch({
            type: "RESET_GETCASES",
        });
    };
}
