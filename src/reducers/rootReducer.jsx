import { combineReducers } from "redux";
import genesis from "./auth/genesis";
import verifyCode from "./auth/verifyCode";
import createCode from "./auth/createCode";
import getUserTypes from "./userTypes/getUserTypes";
import createEnterpriseProfile from "./auth/createEnterpriseProfile";
import createLawyerProfile from "./auth/createLawyerProfile";
import checkout from "./payment/checkout";
import addClient from "./client/addClient";
import getClients from "./client/getClients";
export default combineReducers({
    genesis,
    verifyCode,
    createCode,
    getUserTypes,
    createEnterpriseProfile,
    createLawyerProfile,
    checkout,
    addClient,
    getClients
});