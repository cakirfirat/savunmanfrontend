import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_GETCLIENTS_FULFILLED =
    "FETCH_GETCLIENTS_FULFILLED";
export const FETCH_GETCLIENTS_REJECTED =
    "FETCH_GETCLIENTS_REJECTED";
export const FETCH_GETCLIENTS_PENDING =
    "FETCH_GETCLIENTS_PENDING";
export const RESET_GETCLIENTS = "RESET_GETCLIENTS";

export function getClients() {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_GETCLIENTS",
            payload: axios({
                method: "get",
                url: `${API_BASE}/api/client/get`,
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetGetClients() {
    return (dispatch) => {
        dispatch({
            type: "RESET_GETCLIENTS",
        });
    };
}
