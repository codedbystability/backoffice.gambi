import React from "react";
import axios from "./axios";
import store from "../../reducers/createReducers";
import {userLoggedOut} from "../../actions/authentication";


// const BASE_ASSOCIATE_URL = "http://127.0.0.1:8888/client/";
// export const BASE_URL = "http://127.0.0.1:8888/";

// export const BASE_URL = "https://services.stilsys.net/api/player/";
class AssociateServices extends React.Component {

    handle = async (endpoint, instance) => {
        // if (res?.errors)
        //     toast.error(res?.errors)

        const response = await axios.post(endpoint, instance)

        if (response?.status === 401) {
            store.dispatch(userLoggedOut())
            localStorage.clear()
        }

        return response;
    }
    handleGet = async (endpoint) => {
        console.log('endpoint = ', endpoint)
        const response = await axios.get(endpoint)
        return response
    }


    user = (instance) => this.handle("user", instance);
    getConfiguration = (instance) => this.handle(`configuration`, instance);

    login = (instance) => this.handle("auth/login", instance);


    // TODO STAFF ENDPOINTS
    getStaffList = (instance) => this.handle("operators/index", instance);
    getBonusDrops = (instance) => this.handle(`bonus-drops/index/${instance.page}/${instance.limit}`, instance);
    getGameList = (instance) => this.handle(`games/index/${instance.page}/${instance.limit}`, instance);
    getBonusDropsRedeems = (instance) => this.handle(`bonus-drops/redeems/${instance.page}/${instance.limit}`, instance);
    deactivateBonusDrop = (instance) => this.handle(`bonus-drops/deactivate/${instance.id}`, instance);
    deactivateStaff = (operatorID) => this.handle(`operators/activate/${operatorID}`, {});
    changeStaffPassword = (instance) => this.handle(`operators/password/${instance.id}`, instance);
    storeStaff = (instance) => this.handle(`operators/store`, instance);
    // TODO STAFF ENDPOINTS


    // TODO TRANSACTION ENDPOINTS
    getTransactions = (instance) => this.handle(`transactions/index/${instance.type}/${instance.page}/${instance.limit}`, instance);
    // TODO TRANSACTION ENDPOINTS


    // TODO CUSTOMER ENDPOINTS
    getCustomers = (instance) => this.handle(`customers/index/${instance.page}/${instance.limit}`, instance);

    getCustomerDetail = (instance) => this.handle(`customers/show/${instance.id}`, instance);
    getCustomerSummary = (instance) => this.handle(`customers/summary/${instance.id}`, instance);
    getCustomerTransactions = (instance) => this.handle(`customers/transactions/${instance.id}`, instance);
    getCustomerWallets = (instance) => this.handle(`wallets/index/${instance.page}/${instance.limit}`, instance);


    // TODO CUSTOMER ENDPOINTS


    // TODO OTP ENDPOINTS
    getVerificationCodeList = (instance) => this.handle(`verification-codes/index/${instance.page}/${instance.limit}`, instance);
    getSessionList = (instance) => this.handle(`sessions/index/${instance.page}/${instance.limit}`, instance);
    deactivateSession = (instance) => this.handle(`sessions/deactivate/${instance.id}`, instance);
    getTipList = (instance) => this.handle(`tips/index/${instance.page}/${instance.limit}`, instance);
    getVipstateUpdates = (instance) => this.handle(`vip-state-changes/index/${instance.page}/${instance.limit}`, instance);

    getReloadUsages = (instance) => this.handle(`reload-usages/index/${instance.page}/${instance.limit}`, instance);

    getAvailableReloads = (instance) => this.handle(`reload-availables/index/${instance.page}/${instance.limit}`, instance);

    getReloadHistory = (instance) => this.handle(`reload-availables/history/${instance.page}/${instance.limit}`, instance);

    getAvailableRakebacks = (instance) => this.handle(`rakeback-availables/index/${instance.page}/${instance.limit}`, instance);

    getRakebackUsages = (instance) => this.handle(`rakeback-usages/index/${instance.page}/${instance.limit}`, instance);
    getDebits = (instance) => this.handle(`debits/index/${instance.page}/${instance.limit}`, instance);
    getCustomerNotes = (instance) => this.handle(`notes/index/${instance.page}/${instance.limit}`, instance);
    storeCustomerNote = (instance) => this.handle(`notes/store`, instance);
    updateProfile = (instance) => this.handle(`profile/update/${instance.id}`, instance);
    getCurrencyList = (instance) => this.handle(`currencies/index`, instance);
    storeBonusDrop = (instance) => this.handle(`bonus-drops/store`, instance);


    // TODO OTP ENDPOINTS




}


const associateServices = new AssociateServices();
export default associateServices;
