import {
    /** FETCH PROFESSIONS  */
    FETCH_TEXTTOSPEECH_FULFILLED,
    FETCH_TEXTTOSPEECH_REJECTED,
    FETCH_TEXTTOSPEECH_PENDING,
    RESET_TEXTTOSPEECH,
  } from "../../actions/openai/textToSpeech";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TEXTTOSPEECH_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_TEXTTOSPEECH_FULFILLED:
        return {
          ...state,
          textToSpeech: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_TEXTTOSPEECH_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_TEXTTOSPEECH:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  