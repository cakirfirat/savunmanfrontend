import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_ADDCLIENT_FULFILLED =
    "FETCH_ADDCLIENT_FULFILLED";
export const FETCH_ADDCLIENT_REJECTED =
    "FETCH_ADDCLIENT_REJECTED";
export const FETCH_ADDCLIENT_PENDING =
    "FETCH_ADDCLIENT_PENDING";
export const RESET_ADDCLIENT = "RESET_ADDCLIENT";

export function addClient(name, surname, tckn, email, phoneNumber, address, summary) {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_ADDCLIENT",
            payload: axios({
                method: "post",
                url: `${API_BASE}/api/client/add`,
                data: { name, surname, tckn, email, phoneNumber, address, summary },
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetAddClient() {
    return (dispatch) => {
        dispatch({
            type: "RESET_ADDCLIENT",
        });
    };
}
