import React, {Suspense} from 'react';
import './index.css'
import HttpsRedirect from 'react-https-redirect';

if (window.location.href.includes('sun')) {// @ts-ignore
    import('./styles/styles-sun.scss')
} else if (window.location.href.includes('ren')) { // @ts-ignore
    import('./styles/styles-ren.scss')
} else if (window.location.href.includes('sffx')) {
    // @ts-ignore
    import('./styles/styles-safe.scss')

} else { // @ts-ignore
    // import('./styles/styles-sun.scss')
    import('./styles/styles.scss')
}
// import ReactDOM from 'react-dom'; // For React 17
import {createRoot} from 'react-dom/client'; // For React 18
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import {ThemeContextProvider} from './contexts/themeContext';
import {AuthContextProvider} from './contexts/authContext';
import './i18n';


// console.log = () => {}

const children = (

    <AuthContextProvider>
        <ThemeContextProvider>
            <HttpsRedirect>
                <Router>
                    {/*<React.StrictMode>*/}
                    <Suspense
                        fallback={<div className={'h-100 d-flex align-items-center justify-content-center'}> Güvenlik
                            kontrolü sağlanıyor... </div>}>
                        <App/>
                    </Suspense>
                    {/*</React.StrictMode>*/}
                </Router>
            </HttpsRedirect>
        </ThemeContextProvider>
    </AuthContextProvider>
);

const container = document.getElementById('root');

// ReactDOM.render(children, container); // For React 17
createRoot(container as Element).render(children); // For React 18

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
