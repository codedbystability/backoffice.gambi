import React, {useEffect, useState} from 'react';
import PageWrapper from "../../../layout/PageWrapper/PageWrapper";
import SubHeader, {
    SubHeaderLeft,
    SubHeaderRight,
    SubheaderSeparator,
} from "../../../layout/SubHeader/SubHeader";
import Page from "../../../layout/Page/Page";
import Card, {CardBody, CardFooter} from "../../../components/bootstrap/Card";
import {getFirstLetter} from "../../../helpers/helpers";
import PaginationButtons from "../../../components/PaginationButtons";
import Button from "../../../components/bootstrap/Button";
import Icon from "../../../components/icon/Icon";
import Input from "../../../components/bootstrap/forms/Input";
import Dropdown, {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "../../../components/bootstrap/Dropdown";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import InputGroup from "../../../components/bootstrap/forms/InputGroup";
import useDarkMode from "../../../hooks/useDarkMode";
import {getColorNameWithIndex} from "../../../common/data/enumColors";
import Checks, {ChecksGroup} from "../../../components/bootstrap/forms/Checks";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import Select from "react-select";
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../../../components/bootstrap/Modal";
import Option from "../../../components/bootstrap/Option";
import {default as MySelect} from "../../../components/bootstrap/forms/Select";
import {useSelector} from "react-redux";
import showNotification from "../../../components/extras/showNotification";
import {getLangWithKey} from "../../../lang";
import Spinner from "../../../components/bootstrap/Spinner";
import associateServices from "../../../services/services";

const CustomerList = (props) => {
    const {darkModeStatus} = useDarkMode();
    const colourStyles = {
        control: (styles) => ({...styles, backgroundColor: 'var(--bs-body-bg)'}),
        option: (styles) => {
            return {
                ...styles,
                backgroundColor: 'var(--bs-body-bg)',
                // color:'var(--bs-info)'
            };
        },
        multiValue: (styles) => {
            return {
                ...styles,
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            backgroundColor: 'var(--bs-card-bg)',
            color: 'var(--bs-info)'
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            backgroundColor: 'var(--bs-gray-100)',
            color: 'var(--bs-danger)',
            ':hover': {
                backgroundColor: 'var(--bs-danger)',
                color: 'var(--bs-gray-100)',
            },
        }),
    };
    const navigate = useNavigate()
    const {
        profileStatuses,
        passiveDay,
        staffs
    } = props
    const {vendor} = useSelector(state => state.themeReducer)

    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [accountingEndDate, setAccountingEndDate] = useState('');
    const [accountingStartDate, setAccountingStartDate] = useState('');

    const [loading, setLoading] = useState(false);
    const [selectedProfileStatuses, setSelectedProfileStatuses] = useState([])
    const [totalItems, setTotalItems] = useState(0)


    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(50);
    const [filterText, setFilterText] = useState('');
    const [telNo, setTelNo] = useState('');
    const [metaText, setMetaText] = useState('');

    const [profileStatusSelect, setProfileStatusSelect] = useState([])
    const [profileStatusSelected, setProfileStatusSelected] = useState([])
    const [selectedStaffs, setSelectedStaffs] = useState([])


    const [staffsSelect, setStaffsSelect] = useState([])
    const [staffsSelected, setStaffsSelected] = useState([])

    useEffect(() => {
        // console.log('profileStatuses = ',profileStatuses)
        const mp = profileStatuses?.map(cc => ({
            label: cc.name,
            value: cc.id
        }))
        setProfileStatusSelect(mp)
    }, [profileStatuses])

    useEffect(() => {
        if (staffs?.length >= 1) {
            const mp = staffs?.map(cc => ({
                label: cc.name,
                value: cc.id
            }))
            setStaffsSelect(mp)
        }
    }, [staffs])

    const handlePSChanged = (arr) => {
        setProfileStatusSelected(arr)
        setSelectedProfileStatuses(arr?.map(ii => ii.value))
    }
    const handleStaffChanged = (arr) => {
        setStaffsSelected(arr)
        setSelectedStaffs(arr?.map(ii => ii.value))
    }
    const [direction, setDirection] = useState('desc')
    const [sortBy, setSortBy] = useState('lastDeposit')
    useEffect(() => {
        getDatas()
    }, [currentPage, passiveDay, sortBy, direction])

    // useEffect(() => {
    //     setSelectedProfileStatuses(profileStatuses.map(i => i.id))
    // }, [profileStatuses])


    const getDatas = () => {
        if (loading)
            return false
        // const startTS = startDate ? moment(startDate + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss').unix() : null
        // const endTS = endDate ? moment(endDate + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss').unix() : null
        // const accountingStartTS = accountingStartDate ? moment(accountingStartDate + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss').unix() : null
        // const accountingEndTS = accountingEndDate ? moment(accountingEndDate + ' 23:59:59', 'YYYY-MM-DD HH:mm:ss').unix() : null

        setLoading(true)
        const dataInstance = {
            page: currentPage,
            limit: perPage,
        }
        associateServices.getCustomers(dataInstance).then(res => {
            setLoading(false)

            if (res && res.status === 200) {
                setTotalItems(res.data.total)
                setData(res.data.data)
            }
        })
    }


    const handleDetail = id => navigate(`/operator/customer/detail/${id}`)
    const handleDetailNew = id => window.open(`/operator/customer/detail/${id}`, '_blank')

    const [showCustomerAssignModal, setShowCustomerAssignModal] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState({})
    const [selectedStaff, setSelectedStaff] = useState('')

    useEffect(() => {
        setShowCustomerAssignModal(!!selectedCustomer?.id)
        setSelectedStaff(selectedCustomer?.expert_id?.toString())
    }, [selectedCustomer])

    useEffect(() => {
        if (!showCustomerAssignModal) {
            setSelectedCustomer({})
            setSelectedStaff('')
        }
    }, [showCustomerAssignModal])

    const handleAssignCustomerBack = () => {

        if (!selectedStaff || !selectedCustomer?.id || parseInt(selectedCustomer?.expert_id) === parseInt(selectedStaff))
            return showNotification(
                <span className='d-flex align-items-center'>
				<Icon icon={'Error'} size='lg' className='me-1'/>
				<span>Oppss..</span>
			</span>,
                'Lütfen yeni uzman seçiniz',
            );

        associateServices.assignCustomerByStaff({
            staff_id: selectedStaff,
            customer_id: selectedCustomer?.id
        }).then(res => {

            showNotification(
                <span className='d-flex align-items-center'>
				<Icon icon={res?.status === 200 ? 'Check' : 'Error'} size='lg' className='me-1'/>
				<span>{res?.status === 200 ? 'Harika..' : 'Oppss..'}</span>
			</span>,
                res?.data || res?.errors,
            );

            setSelectedCustomer({})
            setSelectedStaff('')
            getDatas()
        })
    }

    const handleSetSort = (type) => {
        if (sortBy === type)
            setDirection(direction === 'asc' ? 'desc' : 'asc')

        setSortBy(type)
    }
    return (
        <PageWrapper title={'Customer List'}>
            <SubHeader>

                <SubHeaderLeft>
                    <p>-</p>
                </SubHeaderLeft>

            </SubHeader>

            <Page container={'fluid'}>
                <div className='row h-100'>
                    <div className='col-12'>
                        <Card stretch>
                            <CardBody isScrollable className='table-responsive'>
                                <table className='table table-modern table-hover'>
                                    <thead>
                                    <tr>
                                        <th
                                            className='cursor-pointer text-decoration-underline'>
                                            Customer
                                        </th>
                                        <th
                                            onClick={e => handleSetSort('registration')}
                                            className={`cursor-pointer text-decoration-underline ${sortBy === 'registration' ? direction === 'desc' ? 'text-primary' : 'text-danger' : ''}`}>
                                            Registration
                                        </th>
                                        <th>Operator</th>
                                        <th
                                            onClick={e => handleSetSort('firstDeposit')}
                                            className={`cursor-pointer text-decoration-underline ${sortBy === 'firstDeposit' ? direction === 'desc' ? 'text-primary' : 'text-danger' : ''}`}>
                                            First Deposit
                                        </th>
                                        <th
                                            onClick={e => handleSetSort('lastDeposit')}
                                            className={`cursor-pointer text-decoration-underline ${sortBy === 'lastDeposit' ? direction === 'desc' ? 'text-primary' : 'text-danger' : ''}`}>
                                            Last Deposit
                                        </th>
                                        <th
                                            onClick={e => handleSetSort('totalDeposit')}
                                            className={`cursor-pointer text-decoration-underline ${sortBy === 'totalDeposit' ? direction === 'desc' ? 'text-primary' : 'text-danger' : ''}`}>
                                            Total Deposit
                                        </th>

                                        <th
                                            onClick={e => handleSetSort('totalWithdraw')}
                                            className={`cursor-pointer text-decoration-underline ${sortBy === 'totalWithdraw' ? direction === 'desc' ? 'text-primary' : 'text-danger' : ''}`}>
                                            Total Withdraw
                                        </th>


                                        <th
                                            className='cursor-pointer text-decoration-underline'>
                                            ##
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map((i) => (
                                        <tr key={i.id}>
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
                                                                    i.id,
                                                                )} text-${getColorNameWithIndex(
                                                                    i.id,
                                                                )} rounded-2 d-flex align-items-center justify-content-center`}>
																	<span className='fw-bold'>
																		{getFirstLetter(i.username)}
																	</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex-grow-1'>
                                                        <div className='fs-6 fw-bold'>
                                                            {i.profile?.name || '--'}
                                                        </div>
                                                        <div className='fs-6 fw-bold'>
                                                            {i.username}
                                                        </div>
                                                        <div className='text-muted'>
                                                            <small>{i.email}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={'text-muted small'}>
                                                <div>{moment.unix(`${i.registration_ts}`)
                                                    .format('DD-MM-YYYY')}</div>
                                                <div>
                                                    <small className='text-muted'>
                                                        {moment.unix(`${i.registration_ts}`)
                                                            .format('h:mm a')}
                                                    </small>
                                                </div>
                                            </td>
                                            <td className={'text-muted small'}>
                                                {i?.operator?.name || ' - '}</td>

                                            <td className={'text-muted small'}>
                                                <div>{moment.unix(`${i.first_deposit?.timestamp}`)
                                                    .format('DD-MM-YYYY')}</div>
                                                <div>
                                                    <small className='text-muted'>
                                                        {moment.unix(`${i.first_deposit?.timestamp}`)
                                                            .format('h:mm a')}
                                                    </small>
                                                </div>
                                            </td>


                                            <td className={'text-muted small'}>
                                                <div>{moment.unix(`${i.last_deposit?.timestamp}`)
                                                    .format('DD-MM-YYYY')}</div>
                                                <div>
                                                    <small className='text-muted'>
                                                        {moment.unix(`${i.last_deposit?.timestamp}`)
                                                            .format('h:mm a')}
                                                    </small>
                                                </div>
                                            </td>

                                            <td>{i.totalIn?.toFixed(2)} USD</td>
                                            <td>{i.totalOut?.toFixed(2)} USD</td>
                                            <td className={'text-muted small overflow-hidden'} style={{
                                                whiteSpace: 'nowrap'
                                            }}>
                                                <Button icon='Person'
                                                        color='primary'
                                                        isLink
                                                        size={'sm'}
                                                        onClick={() => handleDetail(i.id)}
                                                />


                                                <Button icon='PersonAdd'
                                                        color='info'
                                                        isLink
                                                        size={'sm'}

                                                        onClick={() => handleDetailNew(i.id)}
                                                />

                                                {
                                                    (process.env.REACT_APP_SCOPE === 'ret' && vendor?.id !== 22) ||
                                                    process.env.REACT_APP_SCOPE === 'retplus' &&
                                                    <Button icon='Assignment'
                                                            color='primary'
                                                            isLink
                                                            size={'sm'}
                                                            onClick={() => setSelectedCustomer(i)}
                                                    />
                                                }

                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardBody>
                            {
                                loading ? <CardFooter>
                                    <Spinner color={'info'} inButton isSmall/>
                                </CardFooter> : <PaginationButtons
                                    data={data}
                                    label='customers'
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                    totalItems={totalItems}
                                />
                            }

                        </Card>
                    </div>
                </div>
            </Page>
            {/*<CustomerEditModal setIsOpen={setEditModalStatus} isOpen={editModalStatus} id='0' />*/}


            <Modal
                data-backdrop="static" data-keyboard="false"
                isStaticBackdrop={true}
                isCentered={true}
                isOpen={showCustomerAssignModal} setIsOpen={setShowCustomerAssignModal} size='lg'
                titleId={'Data Assign'}>
                <ModalHeader setIsOpen={setShowCustomerAssignModal} className='p-4'>
                    <ModalTitle id={`Assign Lead`}>Yatırımcı Atama</ModalTitle>
                </ModalHeader>
                <ModalBody className='px-4'>
                    <Card color={'success'}
                          shadow='lg'>

                        <CardBody>
                            <div className='row pt-3 g-4 align-items-center'>

                                <FormGroup
                                    label='Yatırımcı'
                                    isFloating>
                                    <Input
                                        disabled={true}
                                        value={selectedCustomer?.profile?.name}
                                    />
                                </FormGroup>

                                <FormGroup
                                    label='Yeni Uzman'
                                    isFloating>
                                    <MySelect
                                        className={'mb-3'}
                                        placeholder='Yeni Uzman'
                                        value={selectedStaff}
                                        onChange={e => setSelectedStaff(e.target.value.toString())}
                                        ariaLabel={'Data Durum'}>
                                        <Option value={'0'}>Uzman Seciniz</Option>
                                        {
                                            staffs?.map(opt => <Option value={opt.id}
                                                                       key={opt.id}>{opt.name}</Option>)
                                        }

                                    </MySelect>
                                </FormGroup>


                                <div className='col-12'>
                                    <Button
                                        onClick={handleAssignCustomerBack}
                                        color='primary'
                                        className='py-3 text-uppercase'
                                        size='sm'>
                                        Onayla
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </ModalBody>

            </Modal>
        </PageWrapper>
    );
};

export default CustomerList;
