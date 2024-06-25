import {AUTHENTICATION_CONSTANTS} from "../../constants/authentication-constants";
import {setLocalData} from "../../helpers/storage-helpers";

// import { storeData, storeObject } from "../../helpers/storage-helper";


export function authRequestSuccess(data, isOtp = '0') {
    setLocalData("user", JSON.stringify(data.user))
    if (data?.token) {
        setLocalData("isOtp", isOtp)
        setLocalData("token", "Bearer " + data.token)
        setLocalData("facit_authUsername", data.user.email)
    }
    return {
        type: AUTHENTICATION_CONSTANTS.SET_AUTHENTICATION,
        data: data,
    };
}


export function authRequestSuccessLOCAL(data) {
    // setLocalData("user", JSON.stringify(data.user))
    // if (data.token) {
    //   setLocalData("token", "Bearer " + data.token)
    //   setLocalData("facit_authUsername",  data.user.email)
    // }
    return {
        type: AUTHENTICATION_CONSTANTS.SET_AUTHENTICATION,
        data: data,
    };
}


export function setProfileStatuses(data) {
    // setLocalData("user", JSON.stringify(data.user))
    // if (data.token) {
    //   setLocalData("token", "Bearer " + data.token)
    //   setLocalData("facit_authUsername",  data.user.email)
    // }
    return {
        type: AUTHENTICATION_CONSTANTS.SET_PROFILE_STATUSES,
        data: data,
    };
}


export function setHazineVendors(data) {
    // setLocalData("user", JSON.stringify(data.user))
    // if (data.token) {
    //   setLocalData("token", "Bearer " + data.token)
    //   setLocalData("facit_authUsername",  data.user.email)
    // }
    return {
        type: AUTHENTICATION_CONSTANTS.SET_HAZINE_VENDORS,
        data: data,
    };
}


export function setLoggedUserWithLocalToken(data) {
    return {
        type: AUTHENTICATION_CONSTANTS.SET_USER_FROM_LOCAL_STORAGE,
        data: data,
    };
}


export function userLoggedOut() {
    return {
        type: AUTHENTICATION_CONSTANTS.USER_LOG_OUT,
        data: null,
    };
}
