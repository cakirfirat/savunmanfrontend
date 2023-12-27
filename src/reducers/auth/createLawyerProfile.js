import {
    /** FETCH PROFESSIONS  */
    FETCH_CREATELAWYERPROFILE_FULFILLED,
    FETCH_CREATELAWYERPROFILE_REJECTED,
    FETCH_CREATELAWYERPROFILE_PENDING,
    RESET_CREATELAWYERPROFILE,
  } from "../../actions/auth/createLawyerProfile";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CREATELAWYERPROFILE_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_CREATELAWYERPROFILE_FULFILLED:
        return {
          ...state,
          createLawyerProfile: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_CREATELAWYERPROFILE_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_CREATELAWYERPROFILE:
        return {
          error: false,
          done: true,
          spinner: false,
        };
      default:
        return state;
    }
  };
  