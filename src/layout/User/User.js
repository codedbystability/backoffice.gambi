import React, {useState, ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import classNames from 'classnames';
import useDarkMode from '../../hooks/useDarkMode';
import Collapse from '../../components/bootstrap/Collapse';
import {NavigationLine} from '../Navigation/Navigation';
import Icon from '../../components/icon/Icon';
import USERS from "../../common/data/userDummyData";
import {useSelector} from "react-redux";
import store from "../../reducers/createReducers";
import {userLoggedOut} from "../../actions/authentication";
import associateServices from "../../services/services";

const User = () => {
    const {user} = useSelector(state => state.authenticationReducer)

    const navigate = useNavigate();
    // const handleItem = useNavigationItemHandle();
    const {darkModeStatus, setDarkModeStatus} = useDarkMode();

    const [collapseStatus, setCollapseStatus] = useState(false);

    const {t} = useTranslation(['translation', 'menu']);

    const handleUserLogout = () => {
        if (process.env.REACT_APP_SCOPE === 'customer')
            associateServices.logout({}).then(res => {
                console.log('res = ', res)
            })
        localStorage.clear()
        store.dispatch(userLoggedOut())
        // window.location.reload()
    }
    return (
        <>
            <div
                className={classNames('user', {open: collapseStatus})}
                role='presentation'
                onClick={() => setCollapseStatus(!collapseStatus)}>
                <div className='user-avatar'>
                    <img
                        srcSet={USERS.JOHN.srcSet}
                        src={USERS.JOHN.src}
                        color={USERS.JOHN.color}
                        alt='Avatar'
                        width={64}
                        height={64}
                    />
                </div>
                <div className='user-info'>
                    <div className='user-name'>
                            <span>
                            {`${user?.name}`}
                            </span>
                    </div>
                    <div className='user-sub-title'>
                            <span>
                            {user?.email}
                            </span>
                    </div>
                </div>
            </div>

            <Collapse isOpen={collapseStatus} className='user-menu'>
                <nav aria-label='aside-bottom-user-menu'>
                    <div className='navigation'>
                        {
                            process.env.REACT_APP_SCOPE === 'customer' &&
                            <div
                                role='presentation'
                                className='navigation-item cursor-pointer'
                                onClick={() =>
                                    navigate(`/customer/profile/index`)
                                }>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='AccountBox' className='navigation-icon'/>
									<span className='navigation-text'>
                                        Profil
									</span>
								</span>
							</span>
                            </div>
                        }
                        <div
                            role='presentation'
                            className='navigation-item cursor-pointer'
                            onClick={() => {
                                setDarkModeStatus(!darkModeStatus);
                                // handleItem();
                            }}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
                                        icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
                                        color={darkModeStatus ? 'info' : 'warning'}
                                        className='navigation-icon'
                                    />
									<span className='navigation-text'>
										{darkModeStatus
                                            ? (t('menu:DarkMode'))
                                            : (t('menu:LightMode'))}
									</span>
								</span>
							</span>
                        </div>
                    </div>
                </nav>
                <NavigationLine/>
                <nav aria-label='aside-bottom-user-menu-2'>
                    <div className='navigation'>
                        <div
                            role='presentation'
                            className='navigation-item cursor-pointer'
                            onClick={handleUserLogout}>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon icon='Logout' className='navigation-icon'/>
									<span className='navigation-text'>
										Çıkış Yap
									</span>
								</span>
							</span>
                        </div>
                    </div>
                </nav>
            </Collapse>
        </>
    );
};

export default User;
