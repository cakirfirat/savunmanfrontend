import {
    /** FETCH PROFESSIONS  */
    FETCH_CHECKOUT_FULFILLED,
    FETCH_CHECKOUT_REJECTED,
    FETCH_CHECKOUT_PENDING,
    RESET_CHECKOUT,
  } from "../../actions/payment/checkout";
  const initialState = {
    done: false,
    error: false,
    spinner: false,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CHECKOUT_PENDING:
        return {
          done: false,
          error: false,
          spinner: true,
        };
      case FETCH_CHECKOUT_FULFILLED:
        return {
          ...state,
          checkout: action.payload,
          done: true,
          error: false,
          spinner: false,
        };
      case FETCH_CHECKOUT_REJECTED:
        return {
          ...state,
          error: action.payload,
          done: false,
          spinner: false,
        };
      case RESET_CHECKOUT:
        return {
          error: false,
          done: true,
          spinner: false,
        };
      default:
        return state;
    }
  };
  