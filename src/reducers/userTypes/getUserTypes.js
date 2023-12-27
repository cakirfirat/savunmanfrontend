import {
    /** FETCH PROFESSIONS  */
    FETCH_GETUSERTYPES_FULFILLED,
    FETCH_GETUSERTYPES_REJECTED,
    FETCH_GETUSERTYPES_PENDING,
    RESET_GETUSERTYPES,
  } from "../../actions/userTypes/getUserTypes";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GETUSERTYPES_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_GETUSERTYPES_FULFILLED:
        return {
          ...state,
          getUserTypes: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_GETUSERTYPES_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_GETUSERTYPES:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  