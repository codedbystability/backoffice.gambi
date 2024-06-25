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
import NewStaffModal from "./NewStaffModal";
import ChangeStaffModal from "./ChangeStaffPassword";
import associateServices from "../../../services/services";

const StaffList = (props) => {
    const {darkModeStatus} = useDarkMode();
    const {type} = props

    const navigate = useNavigate()


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas()
    }, [type])


    const getDatas = () => {
        if (loading)
            return false

        associateServices.getStaffList({
            type,
            all: true
        }).then(res => {
            setLoading(false)

            if (res && res.status === 200) {
                setData(res.data)
            }
        })
    }

    const handleFilter = () => {
        getDatas()
    }

    const [fetching, setFetching] = useState(false)

    const [newStaffModal, setNewStaffModal] = useState(false)
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [selectedID, setSelectedID] = useState('')

    const handleDisableLogin = (staff) => {
        setFetching(true)
        associateServices.freezeStaff(staff.id).then(res => {
            // console.log('res = ', res)
            setFetching(false)

            if (res?.status === 201)
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                    res.errors,
                );

            if (res?.status === 200) {

                getDatas()
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                    res.data,
                );
            }

        })
    }
    const handleDisableAssign = (staff) => {
        setFetching(true)
        associateServices.deactivateAssign(staff.id).then(res => {
            // console.log('res = ', res)
            setFetching(false)

            if (res?.status === 201)
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                    res.errors,
                );

            if (res?.status === 200) {

                getDatas()
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                    res.data,
                );
            }

        })
    }
    const handleDeactivateLogin = (staff) => {
        setFetching(true)
        associateServices.deactivateStaff(staff.id).then(res => {
            // console.log('res = ', res)
            setFetching(false)

            if (res?.status === 201)
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                    res.errors,
                );

            if (res?.status === 200) {

                getDatas()
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>...</span>
											</span>,
                    res.data,
                );
            }

        })
    }

    const handleChangeOnDuty = (staff) => {
        setFetching(true)
        associateServices.changeDutyStaff(staff.id).then(res => {
            // console.log('res = ', res)
            setFetching(false)

            if (res?.status === 201)
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                    res.errors,
                );

            if (res?.status === 200) {

                getDatas()
                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                    res.data,
                );
            }

        })
    }

    const handleChangePassword = staff => {
        setSelectedID(staff.id)
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
        <PageWrapper title={'Staff List'}>

            <NewStaffModal
                isOpen={newStaffModal}
                setIsOpen={setNewStaffModal}
                reFetch={getDatas}
                disableRole={true}
            />

            <ChangeStaffModal
                isOpen={changePasswordModal}
                setIsOpen={setChangePasswordModal}
                id={selectedID}
            />

            <div className='row h-100'>
                <div className='col-12'>
                    <Card stretch>
                        <CardHeader>
                            <HeaderRight>
                                <Button icon={'NewLabel'}
                                        onClick={e => setNewStaffModal(true)}
                                        color={'primary'}>

                                    Yeni Personel
                                </Button>
                            </HeaderRight>
                        </CardHeader>
                        <CardBody isScrollable className='table-responsive'>
                            <table className='table table-modern table-hover'>
                                <thead>
                                <tr>
                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Personel

                                    </th>
                                    <th>Müşteri Toplam</th>
                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Role
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Durum
                                    </th>


                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        İşlemler
                                    </th>
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
																		{getFirstLetter(i.name)}
																	</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex-grow-1a'>
                                                    <div className='fs-6 fw-bold'>
                                                        {i.name}
                                                    </div>
                                                    <div className='text-muted'>
                                                        <small>{i.email}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>


                                        <td>
                                            {i.customers_count}
                                        </td>


                                        <td>
                                            {i.role?.name}
                                        </td>

                                        <td>
                                            <Badge isLight color={i.is_active ? 'success' : 'danger'}>
                                                {i.is_active ? 'Aktif' : 'Pasif'}
                                            </Badge>
                                        </td>


                                        <td>


                                            <Tooltips title={'Aktif/Pasif'} placement={'bottom'}>
                                                <Button
                                                    className={'m-1'}
                                                    isDisable={fetching}
                                                    onClick={e => handleDeactivateLogin(i)}
                                                    icon={!i.is_active ? 'CheckBox' : 'Block'}
                                                    color={!i.is_active ? 'success' : 'danger'}
                                                    size='sm'
                                                />
                                            </Tooltips>


                                            <Tooltips title={'Şifre Değiştir'} placement={'bottom'}>
                                                <Button
                                                    className={'m-1'}
                                                    isDisable={fetching}
                                                    // onClick={e => handleTrade(acc, 'real')}
                                                    onClick={e => handleChangePassword(i)}
                                                    icon={'ChangeCircle'}
                                                    color={'primary'}
                                                    size='sm'
                                                />
                                            </Tooltips>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/*<CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />*/}
        </PageWrapper>
    );
};

export default StaffList;
