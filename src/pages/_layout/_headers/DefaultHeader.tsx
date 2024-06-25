import React, {useEffect, useState} from 'react';
import Header, {HeaderLeft, HeaderRight} from '../../../layout/Header/Header';
import CommonHeaderRight from './CommonHeaderRight';
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import FxPanelsLogo from "../../../assets/logos/fxpanels-logo.png";
import Button from "../../../components/bootstrap/Button";

const DefaultHeader = () => {
    // const {width} = useDeviceScreen();
    // @ts-ignore
    const {authenticated, user} = useSelector(state => state.authenticationReducer)
    const [show, setShow] = useState(true)
    const location = useLocation()

    useEffect(() => {
        // console.log('window.location.pathname = ', location?.pathname)
        setShow(!location?.pathname?.includes('customer/trade'))
    }, [location])

    if (!authenticated || !show)
        return null

    return (
        <Header>
            {/*<HeaderLeft>*/}
                {/*{*/}
                {/*    process.env.REACT_APP_SCOPE !== 'customer' && <div*/}
                {/*        onClick={e => window.open('https://www.fxpanels.com/', '_blank')}*/}
                {/*        style={{*/}
                {/*            cursor: 'pointer',*/}
                {/*            alignItems: 'end'*/}
                {/*        }}>*/}
                {/*        <code className={'text-muted'}>*/}
                {/*            Powered by {' '}*/}
                {/*        </code>*/}
                {/*        <img src={FxPanelsLogo} style={{*/}
                {/*            width: 80,*/}
                {/*            objectFit: 'cover'*/}
                {/*        }} alt={'FxPanels'}/>*/}


                {/*        <span> | {user?.name?.toUpperCase()}</span>*/}

                {/*    </div>}*/}

            {/*</HeaderLeft>*/}

            <CommonHeaderRight/>
        </Header>
    );
};

export default DefaultHeader;
