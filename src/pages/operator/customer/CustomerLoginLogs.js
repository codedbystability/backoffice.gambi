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


const CustomerLoginLogs = ({id}) => {
    const {darkModeStatus} = useDarkMode();
    const navigate = useNavigate()

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
        getAvailableReloads()
    }

    const getAvailableReloads = () => {
        if (selection?.startDate && selection?.endDate) {
            associateServices.getSessionList({
                from: moment(selection?.startDate).hour(0).minutes(0).seconds(0).unix(),
                to: moment(selection?.endDate).hour(23).minutes(59).seconds(59).unix(),
                limit: perPage,
                page,
                customer_id: id
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


    const handleDeactivate = (item) => associateServices.deactivateSession(item).then(getData)
    return (
        <Card>
            <CardHeader>
                <CardLabel icon='Fingerprint' iconColor='secondary'>
                    <CardTitle tag='h4' className='h5'>
                        Session List
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


            <CardBody isScrollable className={'h-100'}>

                <table className='table table-modern'>
                    <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Country</th>
                        <th>Browser</th>
                        <th>IP</th>
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
                                {item?.country}
                            </td>


                            <td>
                                {item.browser}
                            </td>


                            <td>
                                {item.ip}
                            </td>
                            <td>
                                <Button
                                    isLink
                                    color={item?.is_active ? 'success' : 'danger'}
                                    icon='Circle'
                                    className='text-nowrap'>
                                    {item?.is_active ? 'ACTIVE' : 'PASSIVE'}
                                </Button>

                            </td>


                            <td>


                                {
                                    item.is_active &&
                                    <Button icon='Delete'
                                            color='danger'
                                            isLink
                                            size={'sm'}
                                            onClick={() => handleDeactivate(item)}
                                    />
                                }

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

export default CustomerLoginLogs;
