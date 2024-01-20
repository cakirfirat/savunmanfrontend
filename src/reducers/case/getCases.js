import {
    /** FETCH PROFESSIONS  */
    FETCH_GETCASES_FULFILLED,
    FETCH_GETCASES_REJECTED,
    FETCH_GETCASES_PENDING,
    RESET_GETCASES,
  } from "../../actions/case/getCases";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GETCASES_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_GETCASES_FULFILLED:
        return {
          ...state,
          getCases: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_GETCASES_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_GETCASES:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  