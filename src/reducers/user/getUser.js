import {
    /** FETCH PROFESSIONS  */
    FETCH_GETUSER_FULFILLED,
    FETCH_GETUSER_REJECTED,
    FETCH_GETUSER_PENDING,
    RESET_GETUSER,
  } from "../../actions/user/getUser";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GETUSER_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_GETUSER_FULFILLED:
        return {
          ...state,
          getUser: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_GETUSER_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_GETUSER:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  