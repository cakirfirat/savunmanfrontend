import {
    /** FETCH PROFESSIONS  */
    FETCH_CREATECODE_FULFILLED,
    FETCH_CREATECODE_REJECTED,
    FETCH_CREATECODE_PENDING,
    RESET_CREATECODE,
  } from "../../actions/auth/createCode";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CREATECODE_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_CREATECODE_FULFILLED:
        return {
          ...state,
          createCode: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_CREATECODE_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_CREATECODE:
        return {
          error: false,
          done: true,
          spinner: false,
        };
      default:
        return state;
    }
  };
  