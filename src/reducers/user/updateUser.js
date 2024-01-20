import {
    /** FETCH PROFESSIONS  */
    FETCH_UPDATEUSER_FULFILLED,
    FETCH_UPDATEUSER_REJECTED,
    FETCH_UPDATEUSER_PENDING,
    RESET_UPDATEUSER,
  } from "../../actions/user/updateUser";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_UPDATEUSER_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_UPDATEUSER_FULFILLED:
        return {
          ...state,
          updateUser: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_UPDATEUSER_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_UPDATEUSER:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  