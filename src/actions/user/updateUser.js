import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_UPDATEUSER_FULFILLED =
    "FETCH_UPDATEUSER_FULFILLED";
export const FETCH_UPDATEUSER_REJECTED =
    "FETCH_UPDATEUSER_REJECTED";
export const FETCH_UPDATEUSER_PENDING =
    "FETCH_UPDATEUSER_PENDING";
export const RESET_UPDATEUSER = "RESET_UPDATEUSER";

export function updateUser(Name,Surname,Email,PhoneNumber,Address,PhotoUrl) {
    const token = localStorage.getItem("accessToken");
    return (dispatch) => {
        dispatch({
            type: "FETCH_UPDATEUSER",
            payload: axios({
                method: "post",
                url: `${API_BASE}/api/user/update`,
                data: {
                    Name,
                    Surname,
                    Email,
                    PhoneNumber,
                    Address,
                    PhotoUrl
                },
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetUpdateUser() {
    return (dispatch) => {
        dispatch({
            type: "RESET_UPDATEUSER",
        });
    };
}
