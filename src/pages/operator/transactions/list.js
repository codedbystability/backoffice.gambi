import React, {FC, useEffect, useState} from 'react';
import moment from 'moment';
import Card, {
    CardActions,
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../components/bootstrap/Card'
import Button from '../../../components/bootstrap/Button';
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Icon from '../../../components/icon/Icon';
import PaginationButtons from '../../../components/PaginationButtons';
import useDarkMode from '../../../hooks/useDarkMode';
import 'moment/locale/tr'
import {priceFormat} from "../../../helpers/helpers";
import Modal, {ModalBody, ModalFooter, ModalHeader, ModalTitle} from "../../../components/bootstrap/Modal";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import ReactCreditCards from "react-credit-cards";
import Input from "../../../components/bootstrap/forms/Input";
import InputGroup from "../../../components/bootstrap/forms/InputGroup";
import showNotification from "../../../components/extras/showNotification";
import ReactGA from 'react-ga';
import Spinner from "../../../components/bootstrap/Spinner";
import {useSelector} from "react-redux";
import associateServices from "../../../services/services";
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import Page from "../../../layout/Page/Page";
import InstrumentIcon from "../../../components/instrument-icon";
import Big from "big.js";

const CustomerTransactionList = ({type}) => {
    // const {darkModeStatus} = useDarkMode();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false)

    const {paymentTypes} = useSelector(state => state.authenticationReducer)

    const getSign = (type) => {
        switch (type) {
            case 'TRY':
                return ' ₺';

            case 'USD':
                return ' $';

            case 'EUR':
                return ' €';

            case 'GBP':
                return ' £'
        }
    }

    // useEffect(() => {
    //     getTransactions()
    // }, [type])

    useEffect(() => {
        getTransactions()
    }, [page, limit, type])


    const [reFetchRequired, setReFetchRequired] = useState(false)

    useEffect(() => {
        // console.log('data = ', data)
        const isWaitingExists = data?.filter(i => i.type === 1 && i.status.key === 'beklemede')

        setReFetchRequired(isWaitingExists?.length >= 1)
        // console.log('isWaitingExists = ', isWaitingExists)
    }, [data])

    useEffect(() => {

        if (reFetchRequired) {
            const interval = setInterval(() => {
                console.log('This will run every second!');
                getTransactions()
            }, 10000);
            return () => {
                console.log('clear')
                clearInterval(interval);
            }
        }
    }, [reFetchRequired])

    const getTransactions = () => {

        if (isLoading)
            return null;

        setIsLoading(true)
        associateServices.getTransactions({
            page, limit, type
        }).then(res => {
            if (res && res.status === 200) {
                moment.locale('tr')
                setData(res.data.data)
                setTotal(res.data.total)
                setIsLoading(false)
            }
        })
    }

    const [showBankDetails, setShowBankDetails] = useState(false)
    const [bankDetails, setBankDetails] = useState({})
    const [theDeposit, setTheDeposit] = useState({})

    const handleShowDetails = deposit => {

        // console.log(deposit.info_details)
        setTheDeposit(deposit)
        setBankDetails(deposit.info_details)

        setShowBankDetails(true)
    }

    const handleCheckInfo = deposit => {

        showNotification(
            <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Talep işleniyor</span>
											</span>,
            'İşlem banka bilgileri kontrol ediliyor.',
        );


        setIsLoading(true)
        associateServices.bankInfoCheckByClientApi({
            transaction_id: deposit.id
        }).then(res => {
            // console.log('res = ', res)
            setIsLoading(false)

            if (res?.status !== 200)
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Sistem Uyarı</span>
											</span>,
                    'Şuan için talebinizi karşılayamıyoruz.Lütfen daha sonra tekrar deneyiniz.',
                );
            if (!res?.data?.is_resulted)
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Sonuç</span>
											</span>,
                    'İşleminiz için henüz banka bilgisi tanımlanmamıştır. Finans personeli banka bilgisini ilettiğinde sizinle paylaşılacaktır',
                );


            showNotification(
                <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Banka Bilgi</span>
											</span>,
                'İşleminize tanımlanan banka bilgileri getiriliyor.',
            );
            const dt = res?.data?.data || res?.data
            console.log('dt = ', dt)
            setTheDeposit(deposit)
            let d1 = JSON.parse(dt)
            d1 = d1?.bank ? d1 : JSON.parse(dt)?.data

            if (!d1 || !d1.type || d1?.type === 'error' || d1?.type === 'cancelled')
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Banka Bilgi</span>
											</span>,
                    'İşlem bilgileriniz güncellenemedi.',
                );
            ;

            setBankDetails(d1)
            setShowBankDetails(true)


        })
    }

    const handleCopy = e => {
        try {
            navigator.clipboard.writeText(e)
            showNotification(
                <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika.</span>
											</span>,
                'Metin Kopyalandı.',
            );
        } catch (e) {
            console.error('eee = ', e)

        }
    }

    const [approveLoading, setApproveLoading] = useState(false)
    const handleApproveCheckByClient = () => {

        if (!theDeposit?.id) {
            setShowBankDetails(false)
            setApproveLoading(false)
            return
        }
        setApproveLoading(true)
        associateServices.approveByClientApi({
            transaction_id: theDeposit?.id
        }).then(res => {

            if (res?.status === 200)
                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Harika</span>
				</span>,
                    res.data,
                );

            if (res?.status === 201)
                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Opps..</span>
				</span>,
                    res.errors,
                );

            setShowBankDetails(false)
            setApproveLoading(false)

        })
    }
    return (
        <Page container={'fluid'}>
            <PageWrapper>
                <Card stretch={true}>
                    <CardHeader borderSize={1}>
                        <CardLabel icon='MonetizationOn' iconColor='info'>
                            <CardTitle>Transaction List</CardTitle>
                        </CardLabel>

                    </CardHeader>

                    <CardBody className='table-responsive' isScrollable={true}>
                        <table className='table table-modern'>
                            <thead>
                            <tr>
                                <th
                                    className='cursor-pointer text-decoration-underline'>
                                    Date {' '}
                                    <Icon
                                        size='lg'
                                        icon='FilterList'
                                    />
                                </th>
                                <th>Customer</th>
                                <th>Currency</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>TX</th>
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className='d-flex flex-column'>

                                    <span className='text-nowrap'>
												{moment.unix(`${item.timestamp}`).format(
                                                    'MMM Do YYYY',
                                                )}
											</span>

                                            <span className='text-nowrap'>
												{moment.unix(`${item.timestamp}`).format(
                                                    'h:mm a',
                                                )}
											</span>

                                        </div>
                                    </td>


                                    <td>
                                        <div className='d-flex flex-column'>

                                        <span className='text-nowrap'>
											{item?.customer?.username}
											</span>

                                            <span className='text-nowrap'>
                                                {item?.customer?.email}
											</span>

                                        </div>
                                    </td>
                                    <td>

                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                            <InstrumentIcon code={item.currency}/>
                                            {item.currency}
                                        </div>

                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-start gap-1">
                                            <InstrumentIcon code={item.currency}/>
                                            {Big(item.amount || 0).toFixed(8)}
                                        </div>
                                    </td>
                                    <td>
                                        <Button
                                            isLink
                                            color={item?.status?.key === 'completed' ? 'success' : item?.status?.key === 'cancelled' ? 'danger' : 'info'}
                                            icon='Circle'
                                            className='text-nowrap'>
                                            {item?.status?.name}
                                        </Button>

                                    </td>

                                    <td>
                                        <Button
                                            isLink
                                            color={item?.type === 1 ? 'success' : 'danger'}
                                            icon='Circle'
                                            className='text-nowrap'>
                                            {item?.type === 1 ? 'DEPOSIT' : 'WITHDRAW'}
                                        </Button>

                                    </td>
                                    <td>
                                        {item.tx_id}
                                    </td>
                                    <td>


                                        <Button icon='Person'
                                                color='primary'
                                                isLink
                                                size={'sm'}
                                                onClick={() => console.log(item)}
                                        />

                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardBody>
                    <PaginationButtons
                        data={data}
                        totalItems={total}
                        label='items'
                        setCurrentPage={setPage}
                        currentPage={page}
                        perPage={limit}
                        setPerPage={setLimit}
                    />
                </Card>
            </PageWrapper>
        </Page>

    );
};

export default CustomerTransactionList;
