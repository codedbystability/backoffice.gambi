import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Button, {ButtonGroup} from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
    CardBody,
} from '../../../components/bootstrap/Card';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import CustomerMoneySummaries from "./CustomerMoneySummaries";
import CustomerDetailCard from "./CustomerDetailCard";
import CustomerNotes from "./CustomerNotes";
import CustomerTransactions from "./CustomerTransactions";
import moment from "moment";
import Alert, {AlertHeading} from "../../../components/bootstrap/Alert";
import {useSelector} from "react-redux";
import showNotification from "../../../components/extras/showNotification";
import Icon from "../../../components/icon/Icon";
import Spinner from "../../../components/bootstrap/Spinner";
import associateServices from "../../../services/services";
import Checks from "../../../components/bootstrap/forms/Checks";
import InputMask from "react-input-mask";
import CustomerReloads from "./CustomerReloads";
import CustomerRakebacks from "./CustomerRakebacks";
import CustomerTips from "./CustomerTips";
import CustomerDebits from "./CustomerDebits";
import CustomerVipUpdates from "./CustomerVipUpdates";
import CustomerWallets from "./CustomerWallets";
import CustomerLoginLogs from "./CustomerLoginLogs";
import CustomerGeneral from "./CustomerGeneral";

let intervalID;
let count = 0;
const TABS = {
    ACCOUNT_DETAIL: 'General',
    TRANSACTIONS: 'Transactions',
    RELOADS: 'Reloads',
    RAKEBACKS: 'Rakebacks',
    TIPS: 'Tips',
    DEBITS: 'Debits',
    VIP_UPDATES: 'Vip Updates',
    WALLETS: 'Wallets',
    LOGIN_LOGS: 'Sessions',

};
const CustomerDetail = props => {

    const {id} = useParams();
    const [activeTab, setActiveTab] = useState(TABS.ACCOUNT_DETAIL);
    const [item, setItem] = useState({})
    const reFetch = () => {
        count += 1
        getCustomerDetail()

        if (count >= 5)
            clearInterval(intervalID)
    }

    const getCustomerDetail = () => {
        console.log('getCustomerDetail = ', id)
        associateServices.getCustomerDetail({
            id
        }).then(res => {
            if (res?.status === 200) {
                // console.log('res.data = ', res.data)
                setItem(res.data)
            }
        })
    }
    const appendNewMeta = data => {
        // console.log('appendNewMeta = ', data)
    }


    useEffect(() => {
        setActiveTab(TABS.ACCOUNT_DETAIL)
        getCustomerDetail()


    }, [id])



    if (!item || Object.keys(item).length <= 0)
        return <PageWrapper title={'Customer Detail'}>
            <Page container='fluid'>
                <Spinner color={'light'} inButton>
                    Loading...
                </Spinner>
            </Page>
        </PageWrapper>


    // return <CustomerDetailBinary customerID={id}/>

    return (
        <PageWrapper title={'Customer Detail'}>
            <Page container='fluid'>
                <div className='row h-100'>
                    <div className='col-xxl-3 col-xl-4 col-lg-6'>
                        <Card stretch>
                            <CardBody isScrollable>

                                <CustomerDetailCard
                                    reFetch={reFetch}
                                    appendNewMeta={appendNewMeta}
                                    user={item}
                                />

                                <div className='col-12 border-bottom mt-1 mb-1'/>

                                <div className='row g-2 p-2 d-flex align-items-center justify-content-around'>
                                    <Button
                                        icon='Contacts'
                                        color='info'
                                        className='w-50 p-2 mb-2 mb-2'
                                        isLight={TABS.ACCOUNT_DETAIL !== activeTab}
                                        onClick={() => setActiveTab(TABS.ACCOUNT_DETAIL)}>
                                        {TABS.ACCOUNT_DETAIL}
                                    </Button>

                                    <Button
                                        icon='MonetizationOn'
                                        color='primary'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.TRANSACTIONS !== activeTab}
                                        onClick={() => setActiveTab(TABS.TRANSACTIONS)}>
                                        {TABS.TRANSACTIONS}
                                    </Button>


                                    <Button
                                        icon='MonetizationOn'
                                        color='secondary'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.RELOADS !== activeTab}
                                        onClick={() => setActiveTab(TABS.RELOADS)}>
                                        {TABS.RELOADS}
                                    </Button>


                                    <Button
                                        icon='BackHand'
                                        color='brand'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.RAKEBACKS !== activeTab}
                                        onClick={() => setActiveTab(TABS.RAKEBACKS)}>
                                        {TABS.RAKEBACKS}
                                    </Button>

                                    <Button
                                        icon='PrivacyTip'
                                        color='brand-two'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.TIPS !== activeTab}
                                        onClick={() => setActiveTab(TABS.TIPS)}>
                                        {TABS.TIPS}
                                    </Button>


                                    <Button
                                        icon='AttachMoney'
                                        color='danger'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.DEBITS !== activeTab}
                                        onClick={() => setActiveTab(TABS.DEBITS)}>
                                        {TABS.DEBITS}
                                    </Button>

                                    <Button
                                        icon='AttachMoney'
                                        color='danger'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.VIP_UPDATES !== activeTab}
                                        onClick={() => setActiveTab(TABS.VIP_UPDATES)}>
                                        {TABS.VIP_UPDATES}
                                    </Button>

                                    <Button
                                        icon='AccountBalanceWallet'
                                        color='success'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.WALLETS !== activeTab}
                                        onClick={() => setActiveTab(TABS.WALLETS)}>
                                        {TABS.WALLETS}
                                    </Button>


                                    <Button
                                        icon='Fingerprint'
                                        color='primary'
                                        className='w-50 p-2 mb-2'
                                        isLight={TABS.LOGIN_LOGS !== activeTab}
                                        onClick={() => setActiveTab(TABS.LOGIN_LOGS)}>
                                        {TABS.LOGIN_LOGS}
                                    </Button>


                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className='col-xxl-9 col-xl-8 col-lg-6'>

                        <CustomerMoneySummaries id={id}/>


                        {TABS.ACCOUNT_DETAIL === activeTab && <CustomerGeneral item={item}/>}
                        {TABS.TRANSACTIONS === activeTab && <CustomerTransactions id={id}/>}
                        {TABS.RELOADS === activeTab && <CustomerReloads id={id}/>}
                        {TABS.RAKEBACKS === activeTab && <CustomerRakebacks id={id}/>}
                        {TABS.TIPS === activeTab && <CustomerTips id={id}/>}
                        {TABS.DEBITS === activeTab && <CustomerDebits id={id}/>}
                        {TABS.VIP_UPDATES === activeTab && <CustomerVipUpdates id={id}/>}
                        {TABS.WALLETS === activeTab && <CustomerWallets id={id}/>}
                        {TABS.LOGIN_LOGS === activeTab && <CustomerLoginLogs id={id}/>}


                    </div>
                </div>

            </Page>
        </PageWrapper>
    );
};

export default CustomerDetail;
