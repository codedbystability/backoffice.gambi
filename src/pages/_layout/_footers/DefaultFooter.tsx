import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import useDarkMode from '../../../hooks/useDarkMode';
import Footer from '../../../layout/Footer/Footer';
import Button from "../../../components/bootstrap/Button";
import {useLocation} from "react-router-dom";
import ReactGA from 'react-ga';
import {useSelector} from "react-redux";

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const TRACKING_ID = "G-7690XDG6EC"; // OUR_TRACKING_ID
// @ts-ignore
ReactGA.initialize(TRACKING_ID, {
    domains: ['crm.eklpnl.com', 'localhost'],
    cookie_flags: 'max-age=7200;secure;samesite=none'
});

const DefaultFooter = () => {
    const {darkModeStatus} = useDarkMode();
    // @ts-ignore
    const {vendor} = useSelector(state => state.themeReducer)

    const [show, setShow] = useState(true)
    const location = useLocation()

    useEffect(() => {
        // console.log('window.location.pathname = ', location?.pathname)
        setShow(!location?.pathname?.includes('customer/trade'))

        ReactGA.pageview(window.location.pathname + window.location.search);

        // ReactGA.pageview(window.location.pathname + window.location.search);
    }, [location])

    if (!show)
        return null;


    return (
        <Footer>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <span className='fw-light'>Copyright © 2022 - Version 4.1.2</span>
                    </div>
                    <div className='col-auto'>
                        <span
                            className={classNames('text-decoration-none', {
                                'link-dark': !darkModeStatus,
                                'link-light': darkModeStatus,
                            })}>
                            <small className='fw-bold'>{vendor?.name || ''}</small>
                        </span>
                    </div>
                </div>
            </div>
        </Footer>
    );
};

export default DefaultFooter;
