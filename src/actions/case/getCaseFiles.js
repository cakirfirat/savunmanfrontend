import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_GETCASEFILES_FULFILLED =
    "FETCH_GETCASEFILES_FULFILLED";
export const FETCH_GETCASEFILES_REJECTED =
    "FETCH_GETCASEFILES_REJECTED";
export const FETCH_GETCASEFILES_PENDING =
    "FETCH_GETCASEFILES_PENDING";
export const RESET_GETCASEFILES = "RESET_GETCASEFILES";

export function getCaseFiles(id) {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_GETCASEFILES",
            payload: axios({
                method: "get",
                url: `${API_BASE}/api/casefile/get/case/${id}`,
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetGetFiles() {
    return (dispatch) => {
        dispatch({
            type: "RESET_GETCASEFILES",
        });
    };
}
