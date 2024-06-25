import React, {useEffect, useState} from 'react';
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import Card, {CardActions, CardBody, CardHeader, CardTitle} from "../../../components/bootstrap/Card";
import {getFirstLetter} from "../../../helpers/helpers";
import Button from "../../../components/bootstrap/Button";
import Icon from "../../../components/icon/Icon";
import useDarkMode from "../../../hooks/useDarkMode";
import {getColorNameWithIndex} from "../../../common/data/enumColors";
import {useNavigate} from "react-router-dom";
import Badge from "../../../components/bootstrap/Badge";
import Tooltips from "../../../components/bootstrap/Tooltips";
import showNotification from "../../../components/extras/showNotification";
import {HeaderRight} from "../../../layout/Header/Header";
import CreateBonusDropModal from "./CreateBonusDropModal";
import associateServices from "../../../services/services";
import PaginationButtons from "../../../components/PaginationButtons";
import InstrumentIcon from "../../../components/instrument-icon";
import Big from "big.js";
import moment from "moment/moment";

const BonusDropRedeems = (props) => {
    const {darkModeStatus} = useDarkMode();

    const navigate = useNavigate()
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(50);
    const [total, setTotal] = useState(0);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas()
    }, [])


    const getDatas = () => {
        if (loading)
            return false

        associateServices.getBonusDropsRedeems({
            page: currentPage,
            limit: perPage,
        }).then(res => {
            setLoading(false)
            setFetching(false)


            if (res && res.status === 200) {
                setData(res.data?.data || [])
                setTotal(res.data?.total || 0)
            }
        })
    }


    const [fetching, setFetching] = useState(false)

    const [newStaffModal, setNewStaffModal] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [selectedID, setSelectedID] = useState('')

    const handleDeactivate = (drop) => {
        setFetching(true)
        associateServices.deactivateBonusDrop(drop).then(getDatas)
    }


    useEffect(() => {
        setChangePasswordModal(!!selectedID)
    }, [selectedID])

    useEffect(() => {
        if (!changePasswordModal) {
            setSelectedID(null)
        }
    }, [changePasswordModal])

    return (
        <PageWrapper title={'Bonus Redeems'}>


            <div className='row h-100'>
                <div className='col-12'>
                    <Card stretch>
                        <CardHeader>

                            <CardTitle>
                                Bonus Drop Redeems
                            </CardTitle>
                        </CardHeader>
                        <CardBody isScrollable className='table-responsive'>
                            <table className='table table-modern table-hover'>
                                <thead>
                                <tr>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Customer
                                    </th>


                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Code
                                    </th>


                                    <th>
                                        Before Balance
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Amount
                                    </th>
                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        After Balance
                                    </th>


                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Time
                                    </th>

                                    <th>#</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((i, index) => (
                                    <tr key={index}>
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
                                                                index,
                                                            )} text-${getColorNameWithIndex(
                                                                index,
                                                            )} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(i?.customer?.username)}
																	</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex-grow-1a'>
                                                    <div className='fs-6 fw-bold'>
                                                        {i?.customer?.username}
                                                    </div>
                                                    <div className='text-muted'>
                                                        <small>{i?.customer?.rank}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='flex-grow-1a'>
                                                    <div className='fs-6 fw-bold'>
                                                        {i?.bonus_drop?.code}
                                                    </div>
                                                    <div className='text-muted'>
                                                        <small>{i.amount}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>


                                        <td>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <InstrumentIcon code={i?.bonus_drop?.currency_code}/>
                                                <span className={"fw-bold"}>
                                                    {i.before_balance}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <InstrumentIcon code={i?.bonus_drop?.currency_code}/>
                                                <span className={"fw-bold"}>
                                                    {i.amount}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <InstrumentIcon code={i?.bonus_drop?.currency_code}/>
                                                <span className={"fw-bold"}>
                                                    {i.after_balance}
                                                </span>
                                            </div>
                                        </td>


                                        <td>
                                            <div className='d-flex flex-column'>

                                                <span className='text-nowrap'>
                                                    {moment.unix(`${i.timestamp}`).format(
                                                        'MMM Do YYYY',
                                                    )}
                                                </span>

                                                <span className='text-nowrap'>
                                                    {moment.unix(`${i.timestamp}`).format(
                                                        'h:mm a',
                                                    )}
                                                </span>

                                            </div>
                                        </td>


                                        <td>


                                            <Button
                                                icon={'Person'}
                                                className={'m-1'}
                                                isLight
                                                isDisable={fetching}
                                                onClick={e => navigate(`/operator/customer/detail/${i.customer_id}`)}
                                                color={'success'}
                                                size='sm'
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
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                    </Card>
                </div>
            </div>
            {/*<CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />*/}
        </PageWrapper>
    );
};

export default BonusDropRedeems;
