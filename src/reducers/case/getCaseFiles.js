import {
    /** FETCH PROFESSIONS  */
    FETCH_GETCASEFILES_FULFILLED,
    FETCH_GETCASEFILES_REJECTED,
    FETCH_GETCASEFILES_PENDING,
    RESET_GETCASEFILES,
  } from "../../actions/case/getCaseFiles";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GETCASEFILES_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_GETCASEFILES_FULFILLED:
        return {
          ...state,
          getCaseFiles: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_GETCASEFILES_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_GETCASEFILES:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  