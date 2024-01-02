import {
    /** FETCH PROFESSIONS  */
    FETCH_GETCLIENTS_FULFILLED,
    FETCH_GETCLIENTS_REJECTED,
    FETCH_GETCLIENTS_PENDING,
    RESET_GETCLIENTS,
  } from "../../actions/client/getClients";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_GETCLIENTS_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_GETCLIENTS_FULFILLED:
        return {
          ...state,
          getClients: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_GETCLIENTS_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_GETCLIENTS:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  