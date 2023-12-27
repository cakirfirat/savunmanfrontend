import {
  /** FETCH PROFESSIONS  */
  FETCH_GENESIS_FULFILLED,
  FETCH_GENESIS_REJECTED,
  FETCH_GENESIS_PENDING,
  RESET_GENESIS,
} from "../../actions/auth/genesis";
const initialState = {
  done: false,
  error: false,
  spinner: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENESIS_PENDING:
      return {
        done: false,
        error: false,
        spinner: true,
      };
    case FETCH_GENESIS_FULFILLED:
      return {
        ...state,
        genesis: action.payload,
        done: true,
        error: false,
        spinner: false,
      };
    case FETCH_GENESIS_REJECTED:
      return {
        ...state,
        error: action.payload,
        done: false,
        spinner: false,
      };
    case RESET_GENESIS:
      return {
        error: false,
        done: false,
      };
    default:
      return state;
  }
};
