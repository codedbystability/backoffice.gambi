import React, {FC, useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {CardBody, CardHeader,} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Spinner from '../../../components/bootstrap/Spinner';
import store from "../../../reducers/createReducers";
import {authRequestSuccess, setProfileStatuses} from "../../../actions/authentication";
import {useSelector} from "react-redux";
import showNotification from "../../../components/extras/showNotification";
import Icon from "../../../components/icon/Icon";
import {AUTHENTICATION_CONSTANTS} from "../../../constants/authentication-constants";
import FxPanelsLogo from "../../../assets/logos/fxpanels-logo.png";

import {
    browserName,
    isMobile,
    isTablet,
    isBrowser,
    browserVersion,
    osVersion,
    engineVersion,
    osName
} from 'react-device-detect';
import associateServices from "../../../services/services";

const LoginHeader = ({isNewUser}) => {
    if (isNewUser) {
        return (
            <>
                <div className='text-center h1 fw-bold mt-5'>Create Account,</div>
                <div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
            </>
        );
    }
    return (
        <>
            <div className='text-center h1 fw-bold mt-5'>Hoşgeldiniz,</div>
            <div className='text-center h4 text-muted mb-5'>Devam etmek için, Giriş yapınız !</div>
        </>
    );
};


const Login = () => {

    // const [readyToGo, setReadyToGo] = useState(false)

    // @ts-ignore
    const {authenticated, website} = useSelector(state => state.authenticationReducer)
    const {vendor} = useSelector(state => state.themeReducer)

    useEffect(() => {
        if (authenticated) {
            navigate('/')
        }
    }, [authenticated])

    const [type, setType] = useState('login')
    const [otp, setOtp] = useState('')
    const [number, setNumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleOtp = () => {


        if (otp?.length !== 7)
            return false;

        const validOtp = otp.replace(/[^0-9]/g, "");
        setIsLoading(true)
        associateServices.otpLogin({
            host: window?.location?.hostname,
            otp: validOtp
        }).then(res => {
            setIsLoading(false)
            // console.log('res = ', res)
            if (res?.status === 201) {
                return showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon={'ErrorOutline'} size='lg' className='me-1'/>
					<span>Oopss.</span>
				</span>,
                    res?.errors,
                )
            }

            if (res?.status === 200) {
                store.dispatch(authRequestSuccess(res.data, '1'))
                store.dispatch({type: AUTHENTICATION_CONSTANTS.SET_OTP_LOGGED, data: true})
            }
        })

    }

    const handleForgotPassword = () => {
        console.log('handleForgotPassword')
        const phone = number?.replace(/[^0-9]/g, "")

        if (!username || !phone || phone?.length !== 10)
            return showNotification(
                <span className='d-flex align-items-center'>
					<Icon icon={'ErrorOutline'} size='lg' className='me-1'/>
					<span>Oopss.</span>
				</span>,
                'Lütfen bilgileri eksiksiz doldurunuz',
            )


        associateServices.customerForgotPassword({
            number: '90' + phone,
            username,
            host: window?.location?.href
        }).then(res => {

            console.log('resss = ', res)
            if (res?.status === 201) {
                return showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon={'ErrorOutline'} size='lg' className='me-1'/>
					<span>Oopss.</span>
				</span>,
                    res?.errors
                )
            }

            if (res?.status === 200) {
                setType('otp')
                return showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon={'ErrorOutline'} size='lg' className='me-1'/>
					<span>Bilgilendirme.</span>
				</span>,
                    'Lütfen telefon numaranıza gönderilen 6 haneli kodu giriniz !'
                )
            }


        })


        console.log('TEST SEND FORGOT OTP')
    }

    const handleSubmit = () => {
        // console.log('user = ', username)
        // console.log('password = ', password)
        if (!username || !password)
            return false

        setIsLoading(true)

        const agent = {
            browserName, isMobile, isTablet, isBrowser, browserVersion, osVersion, engineVersion, osName
        }

        // console.log('userAgent = ', agent)
        associateServices.login({
            email: username,
            password,
            agent,
        }).then(res => {
            setIsLoading(false)

            if (res && res.status === 200) {
                // setReadyToGo(true)
                // todo set authentication reducer on bg !!!
                store.dispatch(authRequestSuccess(res.data))
            } else {
                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon={'ErrorOutline'} size='lg' className='me-1'/>
					<span>Oopss.</span>
				</span>,
                    'Bilgilerinizi kontrol ederek tekrar deneyiniz',
                )
            }
        })

    }

    const handleContinue = () => {
        if (!username)
            return false
        setSignInPassword(true)
    };

    const handleChange = (e) => process.env.REACT_APP_SCOPE === 'customer' ? setUsername(e?.target?.value?.toUpperCase()) : setUsername(e?.target?.value)

    const handleChangePass = (e) => setPassword(e.target.value)


    const [signInPassword, setSignInPassword] = useState(false);


    const navigate = useNavigate();
    // const handleOnClick = useCallback(() => navigate('/'), [navigate]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <PageWrapper
            isProtected={false}
            title={'Login'}
            className={'bg-danger'}
        >
            <Page className='p-0'>
                <div className='row h-100 align-items-center justify-content-center'>
                    <div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>


                        <Card className='shadow-3d-dark' data-tour='login-page'>

                            {
                                process.env.REACT_APP_SCOPE === 'customer' && <CardHeader>


                                    <div className="rounded-3 col-12">

                                        <h2 className='display-6 font-monospace my-4 text-center'>
                                            BackOffice
                                        </h2>

                                        <div className="row row-cols-2 g-3 pb-3 px-3 mt-0">
                                            <Button
                                                onClick={e => setType('login')}
                                                className={'col-6'}
                                                color={type === 'login' ? 'light' : 'link'}>
                                                Giriş Yap
                                            </Button>

                                            <Button
                                                className={'col-6'}
                                                onClick={e => setType('otp')}
                                                color={type === 'otp' ? 'light' : 'link'}>
                                                OTP
                                            </Button>


                                        </div>
                                    </div>
                                </CardHeader>
                            }
                            <CardBody>
                                <LoginHeader isNewUser={false}/>

                                <form className='row g-4'>
                                    {type === 'otp' ? (
                                        <>
                                            <div className='col-12'>
                                                <FormGroup
                                                    isFloating
                                                    label='O.T.P. Kod'>
                                                    <Input type='text'
                                                           autoComplete='off'
                                                           value={otp}
                                                           max={6}
                                                           mask={'999-999'}
                                                           onChange={e => setOtp(e?.target?.value)}

                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-12'>
                                                <Button
                                                    isDisable={otp?.length !== 7 || isLoading}
                                                    color='info'
                                                    className='w-100 py-3'
                                                    onClick={handleOtp}>
                                                    {isLoading && (
                                                        <Spinner isSmall inButton isGrow/>
                                                    )}
                                                    Giriş Yap
                                                </Button>
                                            </div>
                                        </>
                                    ) : type === 'forgot-password' ? (
                                        <>
                                            <div className='col-12'>
                                                <FormGroup
                                                    isFloating
                                                    label='Kullanıcı Adı'>
                                                    <Input type='text'
                                                           autoComplete='off'
                                                           value={username}
                                                           onChange={e => setUsername(e?.target?.value)}

                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-12'>
                                                <FormGroup
                                                    isFloating
                                                    label='Telefon Numarası'>
                                                    <Input type='text'
                                                           placeholder={'542 999 99 99'}
                                                           autoComplete='off'
                                                           value={number}
                                                           mask={'999 999 9999'}
                                                           onChange={e => setNumber(e?.target?.value)}

                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-12'>
                                                <Button
                                                    isDisable={
                                                        type === 'otp' ? otp?.length !== 7 || isLoading : (isLoading || !username || !number)}
                                                    color='info'
                                                    className='w-100 py-3'
                                                    onClick={e => type === 'otp' ? handleOtp() : handleForgotPassword()}>
                                                    {isLoading && (
                                                        <Spinner isSmall inButton isGrow/>
                                                    )}
                                                    {type === 'forgot-password' ? 'OTP Gönder' : 'Giriş Yap'}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='col-12'>
                                                <FormGroup
                                                    id='loginUsername'
                                                    isFloating

                                                    label='Kullanıcı Adı'
                                                    className={classNames({
                                                        'd-none': signInPassword,
                                                    })}>
                                                    <Input
                                                        type={'text'}
                                                        autoComplete={'username'}
                                                        value={username}
                                                        onChange={handleChange}
                                                    />
                                                </FormGroup>
                                                {signInPassword && (
                                                    <div className='text-center h4 mb-3 fw-bold'>
                                                        Hoşgeldiniz, {username}.
                                                    </div>
                                                )}
                                                <FormGroup
                                                    id='loginPassword'
                                                    isFloating
                                                    label='Şifreniz'
                                                    className={classNames({
                                                        'd-none': !signInPassword,
                                                    })}>
                                                    <Input
                                                        autoComplete={'current-password'}
                                                        type='password'
                                                        value={password}
                                                        isValid={!password}
                                                        onChange={handleChangePass}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className='col-12'>
                                                {!signInPassword ? (
                                                    <Button
                                                        color='warning'
                                                        className='w-100 py-3'
                                                        isDisable={!username}
                                                        onClick={handleContinue}>
                                                        {isLoading && (
                                                            <Spinner isSmall inButton isGrow/>
                                                        )}
                                                        Devam Et
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        isDisable={!password || isLoading}
                                                        color='warning'
                                                        className='w-100 py-3'
                                                        onClick={handleSubmit}>
                                                        {isLoading && (
                                                            <Spinner isSmall inButton isGrow/>
                                                        )}
                                                        Giriş Yap
                                                    </Button>
                                                )}


                                            </div>

                                            <div className="col-12">
                                                {
                                                    process.env.REACT_APP_SCOPE === 'customer' ? type === 'forgot-password' ?
                                                        <Button
                                                            color='primary'
                                                            isOutline={true}
                                                            className='w-100 py-3'
                                                            isDisable={!username}
                                                            onClick={e => setType('login')}>
                                                            {isLoading && (
                                                                <Spinner isSmall inButton isGrow/>
                                                            )}
                                                            Geri
                                                        </Button>
                                                        :
                                                        <Button
                                                            color='info'
                                                            isOutline={true}
                                                            className='w-100 py-3'
                                                            // isDisable={!username}
                                                            onClick={e => setType('forgot-password')}>
                                                            {isLoading && (
                                                                <Spinner isSmall inButton isGrow/>
                                                            )}
                                                            Şifremi unuttum ?
                                                        </Button> : null
                                                }

                                            </div>
                                        </>
                                    )}

                                </form>
                            </CardBody>
                        </Card>

                        <div className={`text-center my-5`}>
                            <img src={website?.logo_dark} style={{width: 140, objectFit: 'contain'}}/>
                        </div>
                        {/*<div className='text-center'>*/}
                        {/*    <a*/}
                        {/*        href='/'*/}
                        {/*        className={classNames('text-decoration-none me-3', {*/}
                        {/*            'link-light': false,*/}
                        {/*            'link-dark': true,*/}
                        {/*        })}>*/}
                        {/*        Privacy policy*/}
                        {/*    </a>*/}
                        {/*    <a*/}
                        {/*        href='/'*/}
                        {/*        className={classNames('link-light text-decoration-none', {*/}
                        {/*            'link-light': false,*/}
                        {/*            'link-dark': true,*/}
                        {/*        })}>*/}
                        {/*        Terms of use*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Page>


            {/*{*/}
            {/*    process.env.REACT_APP_SCOPE !== 'customer' && <div*/}
            {/*        onClick={e => window.open('https://www.fxpanels.com/', '_blank')}*/}
            {/*        style={{*/}
            {/*            cursor: 'pointer',*/}
            {/*            alignItems: 'end',*/}
            {/*            position: 'absolute',*/}
            {/*            bottom: 0,*/}
            {/*            left: 0,*/}
            {/*            padding: 20,*/}

            {/*        }}>*/}
            {/*        <code className={'text-muted'}>*/}
            {/*            Powered by {' '}*/}
            {/*        </code>*/}
            {/*        <img src={FxPanelsLogo} style={{*/}
            {/*            width: 80,*/}
            {/*            objectFit: 'cover'*/}
            {/*        }} alt={'FxPanels'}/>*/}
            {/*    </div>*/}
            {/*}*/}
        </PageWrapper>
    );
};
Login.propTypes = {
    isSignUp: PropTypes.bool,
};
Login.defaultProps = {
    isSignUp: false,
};

export default Login;
