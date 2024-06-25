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


const CustomerReloads = ({id}) => {
    const {darkModeStatus} = useDarkMode();
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(1)

    const [type, setType] = useState('available-reloads')

    const [selection, setSelection] = useState({
        startDate: moment().startOf('month').toDate(),
        endDate: moment().toDate(),
        key: 'selection',
    })

    useEffect(() => {
        setData([])
        setPage(1)
    }, [type])
    const getData = () => {
        if (type === 'available-reloads')
            getAvailableReloads()
        else if (type === 'reload-history')
            getReloadHistory()
        else if (type === 'reload-usages')
            getReloadUsages()

    }

    const getAvailableReloads = () => {
        if (selection?.startDate && selection?.endDate) {
            associateServices.getAvailableReloads({
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
    const getReloadHistory = () => {
        if (selection?.startDate && selection?.endDate) {
            associateServices.getReloadHistory({
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
    const getReloadUsages = () => {
        if (selection?.startDate && selection?.endDate) {
            associateServices.getReloadUsages({
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
    }, [page, type])
    // useEffect(() => {
    // }, [user, page, perPage])


    const getNotesFirst = () => {
        setPage(1)
        setPerPage(10)

    }
    return (
        <Card>
            <CardHeader>
                <CardLabel icon='MonetizationOn' iconColor='secondary'>
                    <CardTitle tag='h4' className='h5'>
                        Reloads
                    </CardTitle>
                </CardLabel>


                <CardActions className={'d-flex g-2'}>

                    <FormGroup
                        label='List Type'
                        isFloating>
                        <Select
                            placeholder='Reload Type'
                            value={type}
                            onChange={e => setType(e.target.value)}
                            ariaLabel={'Reload Type'}>

                            <Option value={'available-reloads'}>Available Reloads</Option>
                            <Option value={'reload-history'}>Reload History</Option>
                            <Option value={'reload-usages'}>Reload Usages</Option>

                        </Select>
                    </FormGroup>

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
                {
                    type === 'reload-usages' ?
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
                                                            item.id || 1,
                                                        )} text-${getColorNameWithIndex(
                                                            item.id || 1,
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
                                            {Big(item?.usd_amount || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </td>


                                    <td>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <InstrumentIcon code={item?.wallet?.code}/>
                                            <span className={"fw-bold"}>
                                             {Big(item.before_amount || 0).toFixed(8)}
                                        </span>
                                        </div>

                                    </td>


                                    <td>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <InstrumentIcon code={item?.wallet?.code}/>
                                            <span className={"fw-bold text-success"}>
                                             {Big(item.wallet_amount || 0).toFixed(8)}
                                        </span>
                                        </div>
                                    </td>


                                    <td>
                                        <div className="d-flex align-items-center justify-content-start">
                                            <InstrumentIcon code={item?.wallet?.code}/>
                                            <span className={"fw-bold text-success"}>
                                             {Big(item.after_amount || 0).toFixed(8)}
                                        </span>
                                        </div>
                                    </td>


                                    <td>


                                        <Button icon='Person'
                                                color='primary'
                                                isLink
                                                size={'sm'}
                                                onClick={() => navigate(`/operator/customer/detail/${item.customer_id}`)}
                                        />

                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                        :
                        <table className='table table-modern'>
                            <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Activated By</th>
                                <th>Activated At</th>
                                <th>Activated Till</th>
                                <th>Next Claim Ends</th>
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
                                                            item.id || 1,
                                                        )} text-${getColorNameWithIndex(
                                                            item.id || 1,
                                                        )} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(item.username)}
																	</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex-grow-1'>
                                                <div className='fs-6 fw-bold'>
                                                    {item?.customer?.username || '--'}
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
                                        <div className="d-flex align-items-center">
                                            <InstrumentIcon code={'USDT'}/>
                                            <span className="fw-bold">
                                                {Big(item?.usd_amount || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    </td>


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
                                                            item?.operator?.id || 1,
                                                        )} text-${getColorNameWithIndex(
                                                            item?.operator?.id || 1,
                                                        )} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(item?.operator?.name)}
																	</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex-grow-1'>
                                                <div className='fs-6'>
                                                    {item?.operator?.name}
                                                </div>
                                                <div className='text-muted'>
                                                    <small>{item?.operator?.email}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex flex-column'>

                                    <span className='text-nowrap'>
												{moment.unix(`${item.activated_at}`).format(
                                                    'MMM Do YYYY',
                                                )}
											</span>

                                            <span className='text-nowrap'>
												{moment.unix(`${item.activated_at}`).format(
                                                    'h:mm a',
                                                )}
											</span>

                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex flex-column'>

                                    <span className='text-nowrap'>
												{moment.unix(`${item.activated_till}`).format(
                                                    'MMM Do YYYY',
                                                )}
											</span>

                                            <span className='text-nowrap'>
												{moment.unix(`${item.activated_till}`).format(
                                                    'h:mm a',
                                                )}
											</span>

                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex flex-column'>

                                    <span className='text-nowrap'>
												{moment.unix(`${item.next_claim_ends}`).format(
                                                    'MMM Do YYYY',
                                                )}
											</span>

                                            <span className='text-nowrap'>
												{moment.unix(`${item.next_claim_ends}`).format(
                                                    'h:mm a',
                                                )}
											</span>

                                        </div>
                                    </td>


                                    <td>
                                        <Button
                                            isLink
                                            color={'success'}
                                            icon='Circle'
                                            className='text-nowrap'>
                                            ACTIVE
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
                }

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

export default CustomerReloads;
