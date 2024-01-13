import {
    /** FETCH PROFESSIONS  */
    FETCH_ADDCASE_FULFILLED,
    FETCH_ADDCASE_REJECTED,
    FETCH_ADDCASE_PENDING,
    RESET_ADDCASE,
  } from "../../actions/case/addCase";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADDCASE_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_ADDCASE_FULFILLED:
        return {
          ...state,
          addCase: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_ADDCASE_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_ADDCASE:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  