import React from 'react';
import {RouteProps} from 'react-router-dom';
 import DefaultFooter from '../pages/_layout/_footers/DefaultFooter';

const footers: RouteProps[] = [
    // {path: pageLayoutTypesPagesMenu.blank.path, element: null},
    {path: 'auth-pages/login', element: null},
    {path: 'auth-pages/sign-uo', element: null},
    {path: 'auth-pages/404', element: null},
    {path: '*', element: <DefaultFooter/>},
];

export default footers;
