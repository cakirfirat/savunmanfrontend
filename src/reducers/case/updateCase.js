import {
    /** FETCH PROFESSIONS  */
    FETCH_UPDATECASE_FULFILLED,
    FETCH_UPDATECASE_REJECTED,
    FETCH_UPDATECASE_PENDING,
    RESET_UPDATECASE,
  } from "../../actions/case/updateCase";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_UPDATECASE_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_UPDATECASE_FULFILLED:
        return {
          ...state,
          updateCase: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_UPDATECASE_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_UPDATECASE:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  