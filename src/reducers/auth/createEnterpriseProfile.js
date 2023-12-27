import {
    /** FETCH PROFESSIONS  */
    FETCH_CREATEENTERPRISEPROFILE_FULFILLED,
    FETCH_CREATEENTERPRISEPROFILE_REJECTED,
    FETCH_CREATEENTERPRISEPROFILE_PENDING,
    RESET_CREATEENTERPRISEPROFILE,
  } from "../../actions/auth/createEnterpriseProfile";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CREATEENTERPRISEPROFILE_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_CREATEENTERPRISEPROFILE_FULFILLED:
        return {
          ...state,
          createEnterpriseProfile: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_CREATEENTERPRISEPROFILE_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_CREATEENTERPRISEPROFILE:
        return {
          error: false,
          done: true,
          spinner: false,
        };
      default:
        return state;
    }
  };
  