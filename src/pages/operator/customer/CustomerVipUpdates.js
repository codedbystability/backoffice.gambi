import React, {useEffect, useState} from 'react';
import Card, {
    CardActions,
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from '../../../components/bootstrap/Card';
import Button from "../../../components/bootstrap/Button";
import PaginationButtons from "../../../components/PaginationButtons";
import moment from "moment";
import {DateRange} from "react-date-range";
import {tr} from "date-fns/locale";
import Dropdown, {DropdownMenu, DropdownToggle} from "../../../components/bootstrap/Dropdown";
import Big from "big.js";
import associateServices from "../../../services/services";
import InstrumentIcon from "../../../components/instrument-icon";
import Badge from "../../../components/bootstrap/Badge";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Select from "../../../components/bootstrap/forms/Select";
import Option from "../../../components/bootstrap/Option";
import {getColorNameWithIndex} from "../../../common/data/enumColors";
import {getFirstLetter} from "../../../helpers/helpers";
import useDarkMode from "../../../hooks/useDarkMode";
import {useNavigate} from "react-router-dom";

moment.locale('tr')


const CustomerVipUpdates = ({id}) => {
    const {darkModeStatus} = useDarkMode();
    const [data, setData] = useState([])

    useEffect(()=>{
        getVipStates()
    },[])

    const getVipStates = () => {
        associateServices.getVipstateUpdates({
            limit: 100,
            page: 1,
            customer_id: id
        }).then(res => {
            if (res?.status === 200) {
                setData(res?.data?.data || [])
            }
        })
    }


    return (
        <Card>
            <CardHeader>
                <CardLabel icon='SupportAgent' iconColor='secondary'>
                    <CardTitle tag='h4' className='h5'>
                        Customer Vip State Updates
                    </CardTitle>
                </CardLabel>


            </CardHeader>


            <CardBody isScrollable className={'h-100'}>
                <table className='table table-modern'>
                    <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Total Wagered</th>
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
                                {item?.from}
                            </td>


                            <td>
                                {item?.to}
                            </td>


                            <td>

                                        <span className="fw-bold">
                                            {Big(item?.total_wager || 0).toFixed(2)} USD
                                        </span>
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
        </Card>
    );
};

export default CustomerVipUpdates;
