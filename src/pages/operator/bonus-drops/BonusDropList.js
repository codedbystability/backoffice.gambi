import React, {useEffect, useState} from 'react';
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import Card, {CardActions, CardBody, CardHeader} from "../../../components/bootstrap/Card";
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

const BonusDropList = (props) => {
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

        associateServices.getBonusDrops({
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
        <PageWrapper title={'Bonus Drop List'}>

            <CreateBonusDropModal
                isOpen={newStaffModal}
                setIsOpen={setNewStaffModal}
                reFetch={getDatas}
                disableRole={true}
            />


            <div className='row h-100'>
                <div className='col-12'>
                    <Card stretch>
                        <CardHeader>
                            <HeaderRight>
                                <Button icon={'NewLabel'}
                                        onClick={e => setNewStaffModal(true)}
                                        color={'primary'}>

                                    Create
                                </Button>
                            </HeaderRight>
                        </CardHeader>
                        <CardBody isScrollable className='table-responsive'>
                            <table className='table table-modern table-hover'>
                                <thead>
                                <tr>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Code
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Amount
                                    </th>
                                    <th>
                                        From
                                    </th>
                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        To
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Usage Count
                                    </th>


                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Created At
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Status
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Created By
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
																		{getFirstLetter(i.code)}
																	</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex-grow-1a'>
                                                    <div className='fs-6 fw-bold'>
                                                        {i.code}
                                                    </div>
                                                    <div className='text-muted'>
                                                        <small>{i.amount}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>


                                        <td>
                                            <div className="d-flex align-items-center justify-content-start">
                                                <InstrumentIcon code={i.currency_code}/>
                                                <span className={"fw-bold"}>
                                                    {i.amount}
                                                </span>
                                            </div>
                                        </td>


                                        <td>
                                            <div className='d-flex flex-column'>

                                                <span className='text-nowrap'>
                                                    {moment.unix(`${i.start}`).format(
                                                        'MMM Do YYYY',
                                                    )}
                                                </span>

                                                <span className='text-nowrap'>
                                                    {moment.unix(`${i.start}`).format(
                                                        'h:mm a',
                                                    )}
                                                </span>

                                            </div>
                                        </td>


                                        <td>
                                            <div className='d-flex flex-column'>

                                                <span className='text-nowrap'>
                                                    {moment.unix(`${i.end}`).format(
                                                        'MMM Do YYYY',
                                                    )}
                                                </span>

                                                <span className='text-nowrap'>
                                                    {moment.unix(`${i.end}`).format(
                                                        'h:mm a',
                                                    )}
                                                </span>

                                            </div>
                                        </td>


                                        <td>
                                            <span className="fw-bold">
                                                {Big(i.redeems_count || 0).toFixed(2)}
                                            </span>
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
                                            <Badge isLight color={i.is_active ? 'success' : 'danger'}>
                                                {i.is_active ? 'Aktif' : 'Pasif'}
                                            </Badge>
                                        </td>

                                        <td>
                                            <span className="fw-semibold">
                                                {i?.operator?.name}
                                            </span>
                                        </td>

                                        <td>

                                            {
                                                i.is_active &&

                                                <Button
                                                    className={'m-1'}
                                                    isDisable={fetching}
                                                    onClick={e => handleDeactivate(i)}
                                                    icon={!i.is_active ? 'CheckBox' : 'Block'}
                                                    color={!i.is_active ? 'success' : 'danger'}
                                                    size='sm'
                                                />
                                            }

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

export default BonusDropList;
