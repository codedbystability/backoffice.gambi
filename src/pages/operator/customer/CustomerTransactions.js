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


const CustomerTransactions = ({id}) => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(1)

    const [selection, setSelection] = useState({
        startDate: moment().startOf('month').toDate(),
        endDate: moment().toDate(),
        key: 'selection',
    })


    const getData = () => {
        if (selection?.startDate && selection?.endDate) {
            associateServices.getCustomerTransactions({
                from: moment(selection?.startDate).hour(0).minutes(0).seconds(0).unix(),
                to: moment(selection?.endDate).hour(23).minutes(59).seconds(59).unix(),
                limit: perPage,
                page,
                id
            }).then(res => {
                if (res?.status === 200) {
                    setData(res?.data?.data || [])
                    setTotal(res?.data?.total || 0)
                }
            })
        }
    }

    useEffect(() => {
        getData()
    }, [page])
    // useEffect(() => {
    // }, [user, page, perPage])


    const getNotesFirst = () => {
        setPage(1)
        setPerPage(10)

    }
    return (
        <Card className="w-100">
            <CardHeader>
                <CardLabel icon='NotificationsActive' iconColor='warning'>
                    <CardTitle tag='h4' className='h5'>
                        Transactions
                    </CardTitle>
                </CardLabel>


                <CardActions className={'d-flex g-2'}>
                    <Dropdown>
                        <DropdownToggle>
                            <Button color={'danger'} isLight={true} icon='DateRange'>
                                {`${moment(selection?.startDate).format('DD.MM.YY')} / ${moment(selection?.endDate).format('DD.MM.YY')}`}
                            </Button>
                        </DropdownToggle>

                        <DropdownMenu>
                            <DateRange
                                locale={tr}
                                onChange={({selection}) => setSelection(selection)}
                                showSelectionPreview
                                moveRangeOnFirstSelection={false}
                                retainEndDateOnFirstSelection={false}
                                ranges={[selection]}
                                direction='vertical'
                            />
                        </DropdownMenu>
                    </Dropdown>

                    <Button
                        onClick={getData}
                        color={'info'} isLight={true} icon='FlightTakeoff'>
                        Fetch Data
                    </Button>
                </CardActions>
            </CardHeader>

            <CardBody isScrollable  className='table-responsive h-100'>
                <table className='table table-modern'>
                    <thead>
                    <tr>
                        <th> Currency</th>
                        <th> Amount</th>
                        <th> USD</th>
                        <th> Type</th>
                        <th> Status</th>
                        <th> Time</th>
                        <th> Tx ID</th>

                        <td/>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <InstrumentIcon code={item.currency}/>
                                    <span className="fw-bold">
                                        {item.currency}
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div>{item.symbol}</div>
                                    <div className='small fw-semibold'>
                                        {item.amount}
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    <div className='small fw-semibold'>
                                        {item.usd_amount} USD
                                    </div>
                                </div>
                            </td>

                            <td>
                                <Badge isLight color={parseInt(item.type) === 1 ? 'success' : 'primary'}>
                                    {parseInt(item.type) === 1 ? 'Deposit' : 'Withdraw'}
                                </Badge>
                            </td>

                            <td>
                                <Badge isLight color={item?.status?.key === 'completed' ? 'success' : 'danger'}>
                                    {item?.status?.key?.toUpperCase()}
                                </Badge>
                            </td>
                            <td>{moment.unix(item?.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td>
                                <span className="text-muted">
                                    {item.tx_id}
                                </span>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>


                <PaginationButtons
                    totalItems={total}
                    data={data}
                    label='items'
                    setCurrentPage={setPage}
                    currentPage={page}
                    perPage={perPage}
                    setPerPage={setPerPage}
                />
            </CardBody>
        </Card>
    );
};

export default CustomerTransactions;
