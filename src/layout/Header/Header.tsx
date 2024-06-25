import React, {FC, ReactElement, ReactNode, useContext, useLayoutEffect} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useMeasure, useWindowSize} from 'react-use';
import ThemeContext from '../../contexts/themeContext';
import Button, {IButtonProps} from '../../components/bootstrap/Button';
import Portal from '../Portal/Portal';
import useDarkMode from '../../hooks/useDarkMode';
import Popovers from "../../components/bootstrap/Popovers";
import Icon from "../../components/icon/Icon";
import Dropdown, {DropdownItem, DropdownMenu, DropdownToggle} from "../../components/bootstrap/Dropdown";
import {useNavigate} from "react-router-dom";

interface IHeaderLeftProps {
    children: ReactNode;
    className?: string;
}

export const HeaderLeft: FC<IHeaderLeftProps> = ({children, className}) => {
    return <div className={classNames('header-left', 'col-md', className)}>{children}</div>;
};
HeaderLeft.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
HeaderLeft.defaultProps = {
    className: undefined,
};

interface IHeaderRightProps {
    children: ReactNode;
    className?: string;
}

export const HeaderRight: FC<IHeaderRightProps> = ({children, className}) => {
    const [ref, {height}] = useMeasure<HTMLDivElement>();

    const root = document.documentElement;
    root.style.setProperty('--header-right-height', `${height}px`);

    return (
        <div ref={ref} className={classNames('header-right', 'col-md-auto', className)}>
            {children}
        </div>
    );
};
HeaderRight.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
HeaderRight.defaultProps = {
    className: undefined,
};

interface IHeaderProps {
    children: ReactElement<IHeaderLeftProps> | ReactElement<IHeaderRightProps> | ReactNode;
    hasLeftMobileMenu?: boolean;
    hasRightMobileMenu?: boolean;
}

const Header: FC<IHeaderProps> = ({children, hasLeftMobileMenu, hasRightMobileMenu}) => {
    const {themeStatus} = useDarkMode();

    const windowsWidth = useWindowSize().width;
    const [refMobileHeader, sizeMobileHeader] = useMeasure<HTMLDivElement>();
    const [refHeader, sizeHeader] = useMeasure<HTMLDivElement>();
    const navigate = useNavigate()

    const root = document.documentElement;
    root.style.setProperty('--mobile-header-height', `${sizeMobileHeader.height}px`);
    root.style.setProperty('--header-height', `${sizeHeader.height}px`);

    const {
        asideStatus,
        setAsideStatus,
        leftMenuStatus,
        setLeftMenuStatus,
        rightMenuStatus,
        setRightMenuStatus,
        fullScreenStatus, setFullScreenStatus,
        darkModeStatus, setDarkModeStatus
    } = useContext(ThemeContext);

    const styledBtn: IButtonProps = {
        color: darkModeStatus ? 'dark' : 'light',
        hoverShadow: 'default',
        isLight: !darkModeStatus,
        size: 'lg',
    };


    useLayoutEffect(() => {
        if (
            (asideStatus || leftMenuStatus || rightMenuStatus) &&
            windowsWidth < Number(process.env.REACT_APP_MOBILE_BREAKPOINT_SIZE)
        )
            document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    });

    return (
        <>
            <header ref={refMobileHeader} className='mobile-header'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <Button
                                aria-label='Toggle Aside'
                                className='mobile-header-toggle'
                                size='lg'
                                color={asideStatus ? 'primary' : themeStatus}
                                isLight={asideStatus}
                                icon={asideStatus ? 'FirstPage' : 'LastPage'}
                                onClick={() => {
                                    setAsideStatus(!asideStatus);
                                    setLeftMenuStatus(false);
                                    setRightMenuStatus(false);
                                }}
                            />
                            {/*{hasLeftMobileMenu && (*/}
                            {/*	<Button*/}
                            {/*		aria-label='Toggle Left Menu'*/}
                            {/*		className='mobile-header-toggle'*/}
                            {/*		size='lg'*/}
                            {/*		color={leftMenuStatus ? 'primary' : themeStatus}*/}
                            {/*		isLight={leftMenuStatus}*/}
                            {/*		icon={leftMenuStatus ? 'MoreVert' : 'MoreHoriz'}*/}
                            {/*		onClick={() => {*/}
                            {/*			setAsideStatus(false);*/}
                            {/*			setLeftMenuStatus(!leftMenuStatus);*/}
                            {/*			setRightMenuStatus(false);*/}
                            {/*		}}*/}
                            {/*	/>*/}
                            {/*)}*/}
                        </div>
                        {/*{hasRightMobileMenu && (*/}
                        {/*	<div className='col-auto'>*/}
                        {/*		<Button*/}
                        {/*			aria-label='Toggle Right Menu'*/}
                        {/*			className='mobile-header-toggle'*/}
                        {/*			size='lg'*/}
                        {/*			color={rightMenuStatus ? 'primary' : themeStatus}*/}
                        {/*			isLight={rightMenuStatus}*/}
                        {/*			icon={rightMenuStatus ? 'Menu' : 'MenuOpen'}*/}
                        {/*			onClick={() => {*/}
                        {/*				setAsideStatus(false);*/}
                        {/*				setLeftMenuStatus(false);*/}
                        {/*				setRightMenuStatus(!rightMenuStatus);*/}
                        {/*			}}*/}
                        {/*		/>*/}
                        {/*	</div>*/}
                        {/*)}*/}

                        <Dropdown className='col-auto d-flex align-items-center justify-content-center'>
                            <DropdownToggle hasIcon={false}>
                                <Button icon='MoreHoriz' color={'success'} shadow={'lg'}>
                                    İşlemler
                                </Button>
                            </DropdownToggle>
                            <DropdownMenu isCloseAfterLeave={true} isAlignmentEnd>

                                <DropdownItem>
                                    <Button
                                        color='link'
                                        icon='Home'
                                        onClick={() => navigate('/')}>
                                        Anasayfa
                                    </Button>
                                </DropdownItem>

                                <DropdownItem isDivider/>


                                <DropdownItem>
                                    <Button
                                        color='link'
                                        icon='TransferWithinAStation'
                                        onClick={() => navigate('/customer/vault/status')}>
                                        Transfer Yap
                                    </Button>
                                </DropdownItem>
                                <DropdownItem isDivider/>

                                <DropdownItem>
                                    <Button
                                        color='link'
                                        icon='AttachMoney'
                                        onClick={() => navigate('/customer/deposit')}>
                                        Para Yatır
                                    </Button>
                                </DropdownItem>
                                <DropdownItem isDivider/>

                                <DropdownItem>
                                    <Button
                                        color='link'
                                        icon='MoneyOff'
                                        onClick={() => navigate('/customer/withdraw')}>

                                        Para Çek
                                    </Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                        <div className='col-auto'>
                            <Popovers trigger='hover' desc='Dark / Light mode'>
                                <Button
                                    {...styledBtn}
                                    onClick={() => setDarkModeStatus(!darkModeStatus)}
                                    className='btn-only-icon'
                                    data-tour='dark-mode'>
                                    <Icon
                                        icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
                                        color={darkModeStatus ? 'info' : 'warning'}
                                        className='btn-icon'
                                    />
                                </Button>
                            </Popovers>
                        </div>

                        {/*	Full Screen */}
                        <div className='col-auto'>
                            <Popovers trigger='hover' desc='Fullscreen'>
                                <Button
                                    {...styledBtn}
                                    icon={fullScreenStatus ? 'FullscreenExit' : 'Fullscreen'}
                                    onClick={() => setFullScreenStatus(!fullScreenStatus)}
                                    aria-label='Toggle dark mode'
                                />
                            </Popovers>
                        </div>
                    </div>
                </div>
            </header>
            <header
                ref={refHeader}
                className={classNames('header', {
                    'header-left-open': leftMenuStatus,
                    'header-right-open': rightMenuStatus,
                })}>
                <div className='container-fluid'>
                    <div className='row d-flex align-items-center'>
                        {children}
                        {(leftMenuStatus || rightMenuStatus) && (
                            <Portal>
                                <div
                                    role='presentation'
                                    className={classNames('header-overlay', {
                                        'header-overlay-left-menu': leftMenuStatus,
                                        'header-overlay-right-menu': rightMenuStatus,
                                    })}
                                    onClick={() => {
                                        setAsideStatus(false);
                                        setLeftMenuStatus(false);
                                        setRightMenuStatus(false);
                                    }}
                                />
                            </Portal>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};
Header.propTypes = {
    children: PropTypes.node.isRequired,
    hasLeftMobileMenu: PropTypes.bool,
    hasRightMobileMenu: PropTypes.bool,
};
Header.defaultProps = {
    hasLeftMobileMenu: true,
    hasRightMobileMenu: true,
};

export default Header;
