import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ThemeProvider} from 'react-jss';
import {ReactNotifications} from 'react-notifications-component';
import {useFullscreen} from 'react-use';
import {ToastProvider} from 'react-toast-notifications';
import {TourProvider} from '@reactour/tour';
import ThemeContext from '../contexts/themeContext';
import Wrapper from '../layout/Wrapper/Wrapper';
import Portal from '../layout/Portal/Portal';
import {Toast, ToastContainer} from '../components/bootstrap/Toasts';
import useDarkMode from '../hooks/useDarkMode';
import COLORS from '../common/data/enumColors';
import {getOS} from '../helpers/helpers';
import steps, {styles} from '../steps';
import AsideRoutes from '../layout/Aside/AsideRoutes';
import store from "../reducers/createReducers";
import {Provider} from 'react-redux';
import {useDevToolsStatus} from "../hooks/devToolStatusHook";
import NotFoundDevTools from "../components/not-found-dev-tools";

// if (window.location.href.includes('sun') || window.location.href.includes('localhost')) {
//     // @ts-ignore
//     import('../styles/styles.scss')
// } else if (window.location.href.includes('sun')) {
//     // @ts-ignore
//     import('../styles/styles.scss')
//
//     // import '../styles/styles.scss';
//
// }
const App = () => {
    getOS();

    /**
     * Dark Mode
     */
    const {themeStatus, darkModeStatus} = useDarkMode();
    const theme = {
        theme: themeStatus,
        primary: COLORS.PRIMARY.code,
        secondary: COLORS.SECONDARY.code,
        success: COLORS.SUCCESS.code,
        info: COLORS.INFO.code,
        warning: COLORS.WARNING.code,
        danger: COLORS.DANGER.code,
        dark: COLORS.DARK.code,
        light: COLORS.LIGHT.code,
    };
    useEffect(() => {
        if (darkModeStatus) {
            document.documentElement.setAttribute('theme', 'dark');
        }
        return () => {
            document.documentElement.removeAttribute('theme');
        };
    }, [darkModeStatus]);

    /**
     * Full Screen
     */
        // @ts-ignore
    const {fullScreenStatus, setFullScreenStatus} = useContext(ThemeContext);
    const ref = useRef(null);
    useFullscreen(ref, fullScreenStatus, {
        onClose: () => setFullScreenStatus(false),
    });

    /**
     * Modern Design
     */
    useLayoutEffect(() => {
        if (process.env.REACT_APP_MODERN_DESGIN === 'true') {
            document.body.classList.add('modern-design');
        } else {
            document.body.classList.remove('modern-design');
        }
    });

    const isDevToolsOpen = useDevToolsStatus();

    const [hide, setHide] = useState(false)
    useEffect(() => {

        if (isDevToolsOpen) {
            console.info('STOP TRYING')
            setHide(true)
        } else
            setHide(false)
    }, [isDevToolsOpen])


    if (hide)
        return <NotFoundDevTools/>


    return (
        <Provider store={store}>

            <ThemeProvider theme={theme}>
                <ToastProvider components={{ToastContainer, Toast}}>
                    {/*<TourProvider*/}
                    {/*    steps={steps}*/}
                    {/*    styles={styles}*/}
                    {/*    showNavigation={false}*/}
                    {/*    showBadge={false}>*/}

                    <div
                        ref={ref}
                        className='app'
                        style={{
                            backgroundColor: fullScreenStatus ? 'var(--bs-body-bg)' : undefined,
                            zIndex: fullScreenStatus ? 1 : undefined,
                            overflow: fullScreenStatus ? 'scroll' : undefined,
                        }}>
                        <AsideRoutes/>
                        <Wrapper/>
                    </div>


                    <Portal id='portal-notification'>
                        <ReactNotifications/>
                    </Portal>


                    {/*</TourProvider>*/}
                </ToastProvider>
            </ThemeProvider>
        </Provider>

    );
};

export default App;
