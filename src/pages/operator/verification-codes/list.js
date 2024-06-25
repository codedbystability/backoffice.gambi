import React, {FC, useEffect, useState} from 'react';
import moment from 'moment';
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../components/bootstrap/Card'
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import PaginationButtons from '../../../components/PaginationButtons';
import 'moment/locale/tr'
import showNotification from "../../../components/extras/showNotification";
import {useSelector} from "react-redux";
import associateServices from "../../../services/services";
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import Page from "../../../layout/Page/Page";
import InstrumentIcon from "../../../components/instrument-icon";
import Big from "big.js";
import {getColorNameWithIndex} from "../../../common/data/enumColors";
import {getFirstLetter} from "../../../helpers/helpers";
import useDarkMode from "../../../hooks/useDarkMode";

const VerificationCodeList = () => {
    // const {darkModeStatus} = useDarkMode();
    const {darkModeStatus} = useDarkMode();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        getVerificationCodeList()
    }, [page, limit])



    const getVerificationCodeList = () => {

        if (isLoading)
            return null;

        setIsLoading(true)
        associateServices.getVerificationCodeList({
            page, limit
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
                            <CardTitle>Verification Code (OTP) List</CardTitle>
                        </CardLabel>

                    </CardHeader>

                    <CardBody className='table-responsive' isScrollable={true}>
                        <table className='table table-modern'>
                            <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Used At</th>
                                <th>Code</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>#</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <div
                                                    className='ratio ratio-lg1 me-3'
                                                    style={{width: 48, height: 48}}>
                                                    <div
                                                        className={`bg-l${
                                                            darkModeStatus
                                                                ? 'o25'
                                                                : '25'
                                                        }-${getColorNameWithIndex(
                                                            item.id,
                                                        )} text-${getColorNameWithIndex(
                                                            item.id,
                                                        )} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(item.username)}
																	</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex-grow-1'>
                                                <div className='fs-6 fw-bold'>
                                                    {item.customer?.username || '--'}
                                                </div>
                                                <div className='fs-6'>
                                                    {item?.customer.rank}
                                                </div>
                                                <div className='text-muted'>
                                                    <small>{item?.customer?.email}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </td>


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
												{moment.unix(`${item.used_at}`).format(
                                                    'MMM Do YYYY',
                                                )}
											</span>

                                            <span className='text-nowrap'>
												{moment.unix(`${item.used_at}`).format(
                                                    'h:mm a',
                                                )}
											</span>

                                        </div>
                                    </td>



                                    <td>
                                        {item.code}
                                    </td>


                                    <td>
                                        {item.type?.toUpperCase()}
                                    </td>
                                    <td>
                                        <Button
                                            isLink
                                            color={item?.used_at ? 'success' : 'danger'}
                                            icon='Circle'
                                            className='text-nowrap'>
                                            {item?.used_at ? 'USED' : 'NOT USED'}
                                        </Button>

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

export default VerificationCodeList;
