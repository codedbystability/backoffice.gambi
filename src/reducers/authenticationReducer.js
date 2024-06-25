import {AUTHENTICATION_CONSTANTS} from "../constants/authentication-constants";
// import { clearAppData, storeObject } from "../helpers/storage-helper";
import {APP_CONSTANTS} from "../constants/app-constants";
import axios from "../services/services/axios";

const AuthenticationStates = {
    activeUserAccount: "real-account",
    authenticated: false,
    location: "",
    premium: false,
    isOtpLogged: false,
    favorites: [],
    hazineVendors: [],
    paymentTypes: [],
    profileStatuses: [
        {id: 1, vendor_id: 1, name: "NO STATUS", slug: "no-status", is_active: 1},
        {id: 2, vendor_id: 1, name: "Cevapsiz", slug: "no-answer", is_active: 1},
        {id: 3, vendor_id: 1, name: "Tekrar Aranacak", slug: "call-again", is_active: 1},
        {id: 4, vendor_id: 1, name: "Aranmak İstemiyor", slug: "dont-call", is_active: 1},
        {id: 5, vendor_id: 1, name: "Hat İptal", slug: "not-active", is_active: 1},
        {id: 6, vendor_id: 1, name: "Yakın Takip", slug: "close-follow", is_active: 1},
        {id: 7, vendor_id: 1, name: "Uzak Takip", slug: "remote-follow", is_active: 1},
        {id: 8, vendor_id: 1, name: "Yatırım Bekleniyor", slug: "waiting-invest", is_active: 1},
        {id: 9, vendor_id: 1, name: "Pasif", slug: "passive", is_active: 1},
        {id: 10, vendor_id: 1, name: "Orta Potansiyel", slug: "middle", is_active: 1},
        {id: 11, vendor_id: 1, name: "Yüksek Potansiyel", slug: "high", is_active: 1},
    ],
    user: {
        username: "",
        image: "",
    },
    token: null,
    selectedLocation: null,
    dataCategories: [],
    dataStatuses: [
        {id: 1, vendor_id: 1, name: "NO STATUS", slug: "no-status", is_active: 1},
        {id: 2, vendor_id: 1, name: "Cevapsiz", slug: "no-answer", is_active: 1},
        {id: 3, vendor_id: 1, name: "Tekrar Aranacak", slug: "call-again", is_active: 1},
        {id: 4, vendor_id: 1, name: "Aranmak İstemiyor", slug: "dont-call", is_active: 1},
        {id: 5, vendor_id: 1, name: "Hat İptal", slug: "not-active", is_active: 1},
        {id: 6, vendor_id: 1, name: "Yakın Takip", slug: "close-follow", is_active: 1},
        {id: 7, vendor_id: 1, name: "Uzak Takip", slug: "remote-follow", is_active: 1},
        {id: 8, vendor_id: 1, name: "Yatırım Bekleniyor", slug: "waiting-invest", is_active: 1},
        {id: 9, vendor_id: 1, name: "Pasif", slug: "passive", is_active: 1},
        {id: 10, vendor_id: 1, name: "Orta Potansiyel", slug: "middle", is_active: 1},
        {id: 11, vendor_id: 1, name: "Yüksek Potansiyel", slug: "high", is_active: 1},
    ],
    dataAssignTypes: [],
    staffs: [],
    website:{}
};

const authenticationReducer = (state = AuthenticationStates, action) => {
    switch (action.type) {
        case AUTHENTICATION_CONSTANTS.SET_AUTHENTICATION:
            localStorage.setItem('bearer', action.data.token)
            axios.setHeader('Authorization', `Bearer ${action.data.token}`)
            return {
                ...state,
                user: action.data.user,
                // favorites: action.data.user.favorites,
                token: action.data.token ? "Bearer " + action.data.token : state.token,
                authenticated: true,
            };

        case AUTHENTICATION_CONSTANTS.SET_WEBSITE:
            return {
                ...state,
                website: action.data
            }

        case AUTHENTICATION_CONSTANTS.SET_OTP_LOGGED:
            return {
                ...state,
                isOtpLogged: action.data
            }
        case AUTHENTICATION_CONSTANTS.SET_USER_INFO:
            // console.log(AUTHENTICATION_CONSTANTS.SET_USER_INFO, action.data)
            return {
                ...state,
                user: {...action.data, t_id: Math.random()},
            };

        case AUTHENTICATION_CONSTANTS.SET_PROFILE_STATUSES:
            return {
                ...state,
                profileStatuses: action.data,

            };


        case AUTHENTICATION_CONSTANTS.SET_HAZINE_VENDORS:
            return {
                ...state,
                hazineVendors: action.data,

            };


        case AUTHENTICATION_CONSTANTS.SET_DATA_STATUSES:
            return {
                ...state,
                dataStatuses: action.data,

            };


        case AUTHENTICATION_CONSTANTS.SET_DATA_CATEGORIES:
            return {
                ...state,
                dataCategories: action.data,

            };

        case AUTHENTICATION_CONSTANTS.SET_PAYMENT_TYPES:
            return {
                ...state,
                paymentTypes:action.data
            }

        case AUTHENTICATION_CONSTANTS.SET_AUTHENTICATION_LOCAL:
            // console.log("user - ", action.data.user);
            return {
                ...state,
                user: action.data.user,
                // favorites: action.data.user.favorites,
                token: action.data.token,
                authenticated: true,
            };

        case AUTHENTICATION_CONSTANTS.SET_SELECTED_LOCATION:
            return {
                ...state,
                selectedLocation: action.data,
            };

        case AUTHENTICATION_CONSTANTS.SET_LOCATION:
            // console.log(AUTHENTICATION_CONSTANTS.SET_LOCATION, action);
            return {
                ...state,
                location: action.data,
            };


        case AUTHENTICATION_CONSTANTS.UPDATE_USER_REVIEW:
            return {
                ...state,
                user: {
                    ...state.user,
                    image: action.data.image,
                    name: action.data.name,
                    avatar_id: action.data.avatar_id,
                },
            };

        case AUTHENTICATION_CONSTANTS.SET_USER_FROM_LOCAL_STORAGE:

            return {
                ...state,
                token: "Bearer " + action.data.token,
                user: action.data.user,
                favorites: action.data.user.favorites,
                authenticated: true,
            };

        case AUTHENTICATION_CONSTANTS.USER_LOG_OUT: {
            // clearAppData().then(r => null);
            localStorage.clear()
            return {
                ...state,
                authenticated: false,
                premium: false,
                user: {
                    username: "",
                    image: "",
                },
                token: null,
            };
        }

        case AUTHENTICATION_CONSTANTS.SET_USER_PREMIUM: {
            // storeObject("premium", action.data).then(r => null);
            return {
                ...state,
                premium: true,
            };
        }

        case AUTHENTICATION_CONSTANTS.SET_USER_FAVORITES: {
            const favs = [];
            action.data.map(item => {
                favs.push(item.instrument_id);
            });
            return {
                ...state,
                favorites: favs,
            };
        }

        case AUTHENTICATION_CONSTANTS.SET_DATA_ASSIGN_TYPES:
            // console.log(AUTHENTICATION_CONSTANTS.SET_DATA_ASSIGN_TYPES, action.data)
            return {
                ...state,
                dataAssignTypes: action.data
            }

        case AUTHENTICATION_CONSTANTS.SET_STAFFS:
            // console.log(AUTHENTICATION_CONSTANTS.SET_STAFFS, action.data)
            return {
                ...state,
                staffs: action.data
            }


        default:
            return state;

    }
};

export default authenticationReducer;
