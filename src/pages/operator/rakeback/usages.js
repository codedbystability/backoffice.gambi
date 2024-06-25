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

const ReloadUsages = () => {
    // const {darkModeStatus} = useDarkMode();
    const {darkModeStatus} = useDarkMode();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        getReloadUsages()
    }, [page, limit])


    const getReloadUsages = () => {

        if (isLoading)
            return null;

        setIsLoading(true)
        associateServices.getRakebackUsages({
            page, limit,
        }).then(res => {
            if (res && res.status === 200) {
                moment.locale('tr')
                setData(res.data.data)
                setTotal(res.data.total)
                setIsLoading(false)
            }
        })
    }

    return (
        <Page container={'fluid'}>
            <PageWrapper>
                <Card stretch={true}>
                    <CardHeader borderSize={1}>
                        <CardLabel icon='MonetizationOn' iconColor='info'>
                            <CardTitle>Rakeback Usages</CardTitle>
                        </CardLabel>

                    </CardHeader>

                    <CardBody className='table-responsive' isScrollable={true}>
                        <table className='table table-modern'>
                            <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>USD Amount</th>
                                <th>Before Amount</th>
                                <th>Wallet Amount</th>
                                <th>After Amount</th>
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
                                                    {item?.customer?.rank}
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
                                        <div className="d-flex align-items-center justify-content-start">
                                            <InstrumentIcon code={'USDT'}/>
                                            <span className={"fw-bold"}>
                                            {Big(item?.amount_usd || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </td>


                                    <td>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <InstrumentIcon code={item?.wallet?.code}/>
                                            <span className={"fw-bold"}>
                                             {Big(item.before_balance || 0).toFixed(8)}
                                        </span>
                                        </div>

                                    </td>


                                    <td>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <InstrumentIcon code={item?.wallet?.code}/>
                                            <span className={"fw-bold text-success"}>
                                             {Big(item.amount || 0).toFixed(8)}
                                        </span>
                                        </div>
                                    </td>


                                    <td>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <InstrumentIcon code={item?.wallet?.code}/>
                                            <span className={"fw-bold text-success"}>
                                             {Big(item.after_balance || 0).toFixed(8)}
                                        </span>
                                        </div>
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

export default ReloadUsages;
