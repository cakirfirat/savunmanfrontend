import {
    /** FETCH PROFESSIONS  */
    FETCH_ADDCLIENT_FULFILLED,
    FETCH_ADDCLIENT_REJECTED,
    FETCH_ADDCLIENT_PENDING,
    RESET_ADDCLIENT,
  } from "../../actions/client/addClient";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADDCLIENT_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_ADDCLIENT_FULFILLED:
        return {
          ...state,
          addClient: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_ADDCLIENT_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_ADDCLIENT:
        return {
          error: false,
          done: false,
          spinner: false,
        };
      default:
        return state;
    }
  };
  