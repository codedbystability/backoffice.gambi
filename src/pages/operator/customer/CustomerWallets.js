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

moment.locale('tr')


const CustomerWallets = ({id}) => {

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        associateServices.getCustomerWallets({
            limit: 100,
            page: 1,
            customer_id: id
        }).then(res => {
            if (res?.status === 200) {
                setData(res?.data?.data || [])
            }
        })
    }

    // useEffect(() => {
    // }, [user, page, perPage])


    return (
        <Card className="w-100">
            <CardHeader>
                <CardLabel icon='NotificationsActive' iconColor='warning'>
                    <CardTitle tag='h4' className='h5'>
                        Customer Wallets
                    </CardTitle>
                </CardLabel>


            </CardHeader>

            <CardBody isScrollable className='table-responsive h-100'>
                <table className='table table-modern'>
                    <thead>
                    <tr>
                        <th> Currency</th>
                        <th> Balance</th>
                        <th> Network</th>
                        <th> Adress</th>
                        <td/>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <InstrumentIcon code={item.code}/>
                                    <span className="fw-bold">
                                        {item.code}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className='small fw-semibold'>
                                        {item.balance}
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <div className='small fw-semibold'>
                                        {item?.currency?.alpha || item?.code}
                                    </div>
                                </div>
                            </td>


                            <td>
                                <span className="text-muted">
                                    {item.address}
                                </span>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>


            </CardBody>
        </Card>
    );
};

export default CustomerWallets;
