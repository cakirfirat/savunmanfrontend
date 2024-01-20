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
import addCase from "./case/addCase";
import updateCase from "./case/updateCase";
import getCases from "./case/getCases";
import getCaseFiles from "./case/getCaseFiles";
import textToSpeech from "./openai/textToSpeech";
import getCase from "./case/getCase";
import getUser from "./user/getUser";
import updateUser from "./user/updateUser";
export default combineReducers({
    genesis,
    verifyCode,
    createCode,
    getUserTypes,
    createEnterpriseProfile,
    createLawyerProfile,
    checkout,
    addClient,
    getClients,
    addCase,
    updateCase,
    getCases,
    getCaseFiles,
    textToSpeech,
    getCase,
    getUser,
    updateUser
});