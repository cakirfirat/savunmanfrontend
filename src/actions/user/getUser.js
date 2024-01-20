import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_GETUSER_FULFILLED =
    "FETCH_GETUSER_FULFILLED";
export const FETCH_GETUSER_REJECTED =
    "FETCH_GETUSER_REJECTED";
export const FETCH_GETUSER_PENDING =
    "FETCH_GETUSER_PENDING";
export const RESET_GETUSER = "RESET_GETUSER";

export function getUser() {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_GETUSER",
            payload: axios({
                method: "post",
                url: `${API_BASE}/api/user/get`,
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetGetUser() {
    return (dispatch) => {
        dispatch({
            type: "RESET_GETUSER",
        });
    };
}
