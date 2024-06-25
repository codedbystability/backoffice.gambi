import React, {ReactNode, useContext, useState} from 'react';
import Brand from '../../../layout/Brand/Brand';
import Navigation, {NavigationLine} from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import {
    expertPlusMenu,
} from '../../../menu';
import ThemeContext from '../../../contexts/themeContext';
import Aside, {AsideBody, AsideFoot, AsideHead} from '../../../layout/Aside/Aside';

const DefaultAside = () => {
    const {asideStatus, setAsideStatus} = useContext(ThemeContext);

    const [doc, setDoc] = useState(
        localStorage.getItem('facit_asideDocStatus') === 'true' || false,
    );

    return (

        <Aside>
            <AsideHead>
                <Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus}/>
            </AsideHead>
            <AsideBody>

                <Navigation menu={expertPlusMenu} id='aside-callcenter-menu'/>
                <NavigationLine/>


            </AsideBody>


            <AsideFoot>
                <User/>
            </AsideFoot>
        </Aside>
    );
};

export default DefaultAside;
