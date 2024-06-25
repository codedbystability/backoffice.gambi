import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Icon from '../../components/icon/Icon';
import {CardSubTitle} from "../../components/bootstrap/Card";
import {useSelector} from "react-redux";
import Logo from "../../components/Logo";

interface IBrandProps {
    asideStatus: boolean;

    setAsideStatus(...args: unknown[]): unknown;
}

const Brand: FC<IBrandProps> = ({asideStatus, setAsideStatus}) => {

    // @ts-ignore
    const {website} = useSelector(state => state.authenticationReducer)

    return (
        <div className='brand'>
            <div className='brand-logo'>
                <h1 className='brand-title '>
                    <Link to='/' aria-label='Logo'>

                        <img src={website?.logo_dark}
                             style={{
                                 height: 42,
                                 objectFit: 'contain'
                             }}/>
                    </Link>
                </h1>
            </div>
            <button
                type='button'
                className='btn brand-aside-toggle'
                aria-label='Toggle Aside'
                onClick={() => setAsideStatus(!asideStatus)}>
                <Icon icon='FirstPage' className='brand-aside-toggle-close'/>
                <Icon icon='LastPage' className='brand-aside-toggle-open'/>
            </button>
        </div>
    );
};
Brand.propTypes = {
    asideStatus: PropTypes.bool.isRequired,
    setAsideStatus: PropTypes.func.isRequired,
};

export default Brand;
