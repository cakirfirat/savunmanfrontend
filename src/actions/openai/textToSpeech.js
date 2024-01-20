import axios from "axios";
import { API_BASE } from "../../config/env";
export const FETCH_TEXTTOSPEECH_FULFILLED =
    "FETCH_TEXTTOSPEECH_FULFILLED";
export const FETCH_TEXTTOSPEECH_REJECTED =
    "FETCH_TEXTTOSPEECH_REJECTED";
export const FETCH_TEXTTOSPEECH_PENDING =
    "FETCH_TEXTTOSPEECH_PENDING";
export const RESET_TEXTTOSPEECH = "RESET_TEXTTOSPEECH";

export function textToSpeech(model, input, voice, response_format, speed) {
    return (dispatch) => {
        dispatch({
            type: "FETCH_TEXTTOSPEECH",
            payload: axios({
                method: "post",
                url: `https://api.openai.com/v1/audio/speech`,
                data: { model, input, voice, response_format, speed },
                responseType: 'blob',
                headers: {
                    "Accept-Language": "tr-tr",
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`,
                },
            }).then((result) => result.data),
        });
    };
}

export function resetTextToSpeech() {
    return (dispatch) => {
        dispatch({
            type: "RESET_TEXTTOSPEECH",
        });
    };
}
