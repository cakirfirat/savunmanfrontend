import {
    /** FETCH PROFESSIONS  */
    FETCH_GETCASE_FULFILLED,
    FETCH_GETCASE_REJECTED,
    FETCH_GETCASE_PENDING,
    RESET_GETCASE,
  } from "../../actions/case/getCase";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GETCASE_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_GETCASE_FULFILLED:
        return {
          ...state,
          getCase: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_GETCASE_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_GETCASE:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  