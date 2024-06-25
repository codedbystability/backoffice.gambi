import React, {FC, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Content from '../Content/Content';
import WrapperOverlay from './WrapperOverlay';
import HeaderRoutes from '../Header/HeaderRoutes';
import FooterRoutes from '../Footer/FooterRoutes';
import ThemeContext from '../../contexts/themeContext';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {getLocalData} from "../../helpers/storage-helpers";
import store from "../../reducers/createReducers";
import {
    authRequestSuccess,
    authRequestSuccessLOCAL,
    setHazineVendors,
    setProfileStatuses
} from "../../actions/authentication";
import {AUTHENTICATION_CONSTANTS} from "../../constants/authentication-constants";
import {THEME_CONSTANTS, vendors} from "../../constants/theme-constants";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import associateServices from "../../services/services";

export const WrapperContainer = ({children, className, ...props}) => {
    const {rightPanel} = useContext(ThemeContext);
    return (
        <div
            className={classNames(
                'wrapper',
                {'wrapper-right-panel-active': rightPanel},
                className,
            )}
            {...props}>
            {children}
        </div>
    );
};
const Wrapper = () => {

    const {authenticated, website} = useSelector(state => state.authenticationReducer)
    const {vendor} = useSelector(state => state.themeReducer)
    const tawkMessengerRef = useRef();


    const onLoad = () => {
        console.log('onLoad works!');
    };

    const navigate = useNavigate();

    const location = useLocation()


    useEffect(() => {
        associateServices.getConfiguration({}).then(res => store.dispatch({
            type: AUTHENTICATION_CONSTANTS.SET_WEBSITE,
            data: res?.data
        }))

        if (!authenticated) {


            const query = new URLSearchParams(window.location.search);

            //todo check for local data
            const token = getLocalData('token');
            const userSTR = getLocalData('user');
            const isOtp = getLocalData('isOtp');
            if (token && userSTR && (!isOtp || isOtp !== '1')) {
                const user = JSON.parse(userSTR)
                const data = {
                    token,
                    user
                }

                // getStaticApis()


                store.dispatch(authRequestSuccessLOCAL(data))
                // console.log('window.location.pathname = ', window.location.pathname)
                navigate(window.location.pathname);
            } else {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                localStorage.removeItem('isOtp')
                navigate(`/auth-pages/login`);
            }

        }

        return () => {
        };
    }, [authenticated]);


    return (
        <>
            <WrapperContainer>
                <HeaderRoutes/>
                <Content/>
                <FooterRoutes/>
            </WrapperContainer>
            <WrapperOverlay/>

        </>
    );
};

export default Wrapper;
