import React, {useEffect, useState} from 'react';
import Card, {
    CardActions,
    CardBody,
} from '../../../components/bootstrap/Card';
import Avatar from '../../../components/Avatar';
import Icon from '../../../components/icon/Icon';
import USERS from "../../../common/data/userDummyData";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Select from "../../../components/bootstrap/forms/Select";
import Option from "../../../components/bootstrap/Option";
import Dropdown, {DropdownItem, DropdownMenu, DropdownToggle} from "../../../components/bootstrap/Dropdown";
import Button from "../../../components/bootstrap/Button";
import showNotification from "../../../components/extras/showNotification";
// import CustomerUpdateModal from "./CustomerUpdateModal";
import Input from "../../../components/bootstrap/forms/Input";
import Modal, {ModalBody, ModalFooter, ModalHeader, ModalTitle} from "../../../components/bootstrap/Modal";
import Spinner from "../../../components/bootstrap/Spinner";
import classNames from "classnames";
import useDarkMode from "../../../hooks/useDarkMode";
import moment from "moment/moment";
import Badge from "../../../components/bootstrap/Badge";
import Alert, {AlertHeading} from "../../../components/bootstrap/Alert";
import Tooltips from "../../../components/bootstrap/Tooltips";
// import CustomerUpdateLeadModal from "./CustomerUpdateLeadModal";
import {useSelector} from "react-redux";
// import CustomerTagOrReminder from "./CustomerTagOrReminder";
import associateServices from "../../../services/services";
import StoreNoteModal from "./StoreNoteModal";


const CustomerDetailCard = (props) => {
        const {
            user,
            profileStatuses,
            lastOnline,
            metas,
            activeMeta,
            appendNewMeta,
            group,
            reFetch,
            handleChangeSepAccount
        } = props

        const {user: authUser, staffs} = useSelector(state => state.authenticationReducer)
        const [selectedProfileStatus, setSelectedProfileStatus] = useState('')
        // const [activeMeta, setActiveMeta] = useState('')

        const [representativeID, setRepresentativeID] = useState('')

        const [showLeadUpdateModal, setShowLeadUpdateModal] = useState(false)
        const [showTagOrReminder, setShowTagOrReminder] = useState(false)
        const [editModalStatus, setEditModalStatus] = useState(false)
        const [callId, setCallId] = useState(false)
        const [callModalStatus, setCallModalStatus] = useState(false)
        const [showMainVaultModal, setShowMainVaultModal] = useState(false)
        const [showWithdrawLimitModal, setShowWithdrawLimitModal] = useState(false)
        const [newAmount, setNewAmount] = useState('')
        const [newLimit, setNewLimit] = useState('')
        const [comment, setComment] = useState('')
        const [type, setType] = useState('')


        const assignCustomer = () => {

            associateServices.assignCustomerByStaff({
                staff_id: representativeID,
                customer_id: user?.id
            }).then(res => {

                showNotification(
                    <span className='d-flex align-items-center'>
				<Icon icon={res?.status === 200 ? 'Check' : 'Error'} size='lg' className='me-1'/>
				<span>{res?.status === 200 ? 'Harika..' : 'Oppss..'}</span>
			</span>,
                    res?.data || res?.errors,
                );

            })
        }

        useEffect(() => {
            if (representativeID && representativeID !== user?.representative?.id?.toString()) {
                console.log('CHANGE REPRESENTATIVE')
                assignCustomer()
            }
        }, [representativeID])

        const handleNote = () => {
            setCallModalStatus(false)
            setEditModalStatus(true)
            // console.log('handleNote')
        }

        const handleNewDemo = () => {
            associateServices.createNewTraderAccountDemo(user?.id)
                .then(res => {
                    console.log('handleNewDemo = ', res)
                    if (res?.status === 201)
                        return showNotification(
                            <span className='d-flex align-items-center'>
					<Icon icon={'Info'} size='lg' className='me-1'/>
					<span>Oppss..</span>
				</span>,
                            res?.errors,
                        )

                    if (res?.status === 200) {
                        showNotification(
                            <span className='d-flex align-items-center'>
					<Icon icon={'VerifiedUser'} size='lg' className='me-1'/>
					<span>Harika..</span>
				</span>,
                            res?.data?.message,
                        )
                    }
                })
        }

        const [showNewAccountModal, setNewAccountModal] = useState(false)
        const [accountType, setAccountType] = useState('normal')


        const handleNewAccount = () => {
            associateServices.createNewTraderAccount(user.id, {
                i_type: accountType
            }).then(res => {
                console.log('ress = ', res)

                if (res?.status === 201)
                    return showNotification(
                        <span className='d-flex align-items-center'>
					<Icon icon={'Info'} size='lg' className='me-1'/>
					<span>Oppss..</span>
				</span>,
                        res?.errors,
                    )

                if (res?.status === 200) {
                    showNotification(
                        <span className='d-flex align-items-center'>
					<Icon icon={'VerifiedUser'} size='lg' className='me-1'/>
					<span>Harika..</span>
				</span>,
                        res?.data?.message,
                    )
                    setNewAccountModal(false)
                    return appendNewMeta(res.data)
                }

            })
        }

        const [showDocuments, setShowDocuments] = useState(false)
        const [documents, setDocuments] = useState([])
        const checkForDocuments = () => {
            // if (user.is_verified)
            //     return false;

            associateServices.getCustomerDocuments(user.id).then(res => {
                // console.log('res = ', res)
                if (res?.status === 200) {
                    if (!res.data || res?.data?.length <= 0)
                        return showNotification(
                            <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps...</span>
											</span>,
                            `Yuklenen evrak bulunamadi`,
                        );

                    setDocuments(res.data)
                    setShowDocuments(true)
                }
            })
        }

        const handleApproveAccount = () => {
            console.log('handleApproveAccount')
            associateServices.approveAccount(user?.id).then(res => {
                console.log('RESSS')

                if (res.status === 201)
                    return showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Oppss.</span>
											</span>,
                        res.errors,
                    );

                return showNotification(
                    <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika.</span>
											</span>,
                    res.data,
                );
            })
        }

        const handleObserve = item => {

            associateServices.observeDocument(user.id, item.id).then(res => {
                console.log('res=>', res)
                if (res?.data)
                    window.open(res.data, '_blank')
            })
        }

        const handleApproveDocument = (item) => {

            associateServices.approveDocument(user.id, item.id).then(res => {
                if (res?.status === 200) {
                    showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika.</span>
											</span>,
                        res.data,
                    );

                    checkForDocuments()
                }

            })
        }


        const handleCancelDocument = (item) => {

            associateServices.cancelDocument(user.id, item.id).then(res => {
                if (res?.status === 200) {

                    showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika.</span>
											</span>,
                        res.data,
                    );

                    checkForDocuments()

                }

            })
        }

        const [showSmsModal, setShowSmsModal] = useState(false)
        const [showRemoveAllBonusModal, setShowRemoveAllBonusModal] = useState(false)
        const [showBonusModal, setShowBonusModal] = useState(false)
        const [bonusAmount, setBonusAmount] = useState('')
        const [bonusPercent, setBonusPercent] = useState('')
        const [bonusDescription, setBonusDescription] = useState('')
        const [bonusWay, setBonusWay] = useState('')
        const [bonusType, setBonusType] = useState('')


        useEffect(() => {
            if (bonusType === 'arkadas-bonusu') {
                setBonusPercent(100)
            }
        }, [bonusType])

        const handleAddBonus = () => {
            setShowBonusModal(true)
        }

        const [otpApproved, setOtpApproved] = useState(false)
        const handleSendOtp = () => {
            if (!otpApproved)
                return setOtpApproved(true)
            associateServices.sendOtpToCustomer(user?.id)
                .then(res => {
                    setOtpApproved(false)
                    if (res?.status === 201)
                        return showNotification(
                            <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                            res.errors,
                        );

                    if (res?.status === 200)
                        return showNotification(
                            <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika..</span>
											</span>,
                            res.data,
                        );
                })
        }

        const handleRemoveAllBonuses = () => {
            setShowRemoveAllBonusModal(true)
        }

        const handleChangeAccountType = () => {
            associateServices.changeAccountBonusType({
                customer_id: user?.id,
                old_type: activeMeta?.i_type
            }).then(res => {
                if (res?.status === 200) {
                    reFetch()
                    return showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika..</span>
											</span>,
                        res.data,
                    );
                }


                if (res?.status === 201)
                    return showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                        res.errors,
                    );
            })
        }

        const handleStoreNewWithdrawLimit = () => {
            if (!newLimit)
                return false


            associateServices.updateWithdrawLimit(user?.id, {
                newLimit
            }).then(res => {
                console.log('res = ', res)

                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Bilgilendirme</span>
				</span>,
                    res?.data || res?.errors
                );

                reFetch();

                setShowWithdrawLimitModal(false)
            })
        }
        const handleStoreBonus = () => {
            if (!bonusWay || !bonusType || !bonusAmount || !bonusPercent || !bonusDescription)
                return showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Opps..</span>
				</span>,
                    'Lütfen tüm alanları doldurunuz .'
                );


            /*
                    'login' => 'required',
            'customer_id' => 'required',
            'bonusType' => 'required',
            'bonusAmount' => 'required|integer|min:1|max:1000',
            'bonusPercent' => 'required',
            'bonusDescription' => 'required',
             */

            const instance = {
                login: activeMeta?.account,
                customer_id: user?.id,
                bonusType,
                bonusAmount,
                bonusPercent,
                bonusDescription,
                bonusWay
            }
            associateServices.addBonus(instance)
                .then(res => {
                    if (res?.status === 201)
                        return showNotification(
                            <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                            res.errors,
                        );


                    setBonusPercent('')
                    setBonusType('')
                    setBonusDescription('')
                    setBonusAmount('')
                    setBonusWay('')
                    setShowRemoveAllBonusModal(false)
                    setShowBonusModal(false)
                    reFetch()

                    if (res?.status === 200)
                        return showNotification(
                            <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika..</span>
											</span>,
                            res.data,
                        );

                })
        }

        const handleCancelAllBonuses = () => {

            associateServices.removeAllBonuses({
                login: activeMeta?.account,
                customer_id: user?.id
            }).then(res => {
                if (res?.status === 201)
                    return showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Opps..</span>
											</span>,
                        res.errors,
                    );

                if (res?.status === 200) {
                    setShowRemoveAllBonusModal(false)
                    setShowBonusModal(false)
                    reFetch()
                    return showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Harika..</span>
											</span>,
                        'Panel bonusları başarıyla pasif edildi.',
                    );
                }


            })
        }


        const handleStoreAmount = () => {

            if (!comment || !type || parseFloat(newAmount) <= 0)
                showNotification(
                    'Oppss.',
                    <div className='row d-flex align-items-center'>
                        <div className='col-auto h5'>Lütfen tüm alanları doldurunuz</div>
                    </div>,
                );

            associateServices.addOrRemoveBalanceForMainVault({
                customer_id: user?.id,
                amount: parseFloat(newAmount),
                note: comment,
                type
            }).then(res => {
                console.log(res)
                if (res?.status === 200) {

                    showNotification(
                        'Harika..',
                        <div className='row d-flex align-items-center'>
                            <div className='col-auto h5'>Hesap Güncellendi.</div>
                        </div>,
                    );

                    setNewAmount('')
                    setComment('')
                    setType('')
                    setShowMainVaultModal(false)

                    console.log('reFetch')
                    reFetch && reFetch()
                }
            })
        }
        return (
            <>
                <Modal
                    data-backdrop="static" data-keyboard="false"
                    isCentered={true}
                    isStaticBackdrop={true}
                    isOpen={showDocuments} setIsOpen={setShowDocuments} size='xl' titleId={Math.random().toString()}>
                    <ModalHeader setIsOpen={setShowDocuments} className='p-4'>
                        <ModalTitle id={'customer-documents'}>{'Documents'}</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        <div className='row g-4 p-3 justify-content-center'>
                            {
                                documents.map(document => {
                                    return (
                                        <div className='col-xxl-2 col-lg-3 col-md-6 justify-content-center'>

                                            <button
                                                type='button'
                                                onClick={() => console.log(document)}
                                                className={'p-3 border-3 rounded-3 align-content-around justify-content-around'}>

                                                <div>
                                                    <Badge color={'danger'}>
                                                        {document.name?.slice(20)}
                                                    </Badge>
                                                    <div>{moment.unix(`${document.timestamp}`)
                                                        .format('DD-MM-YYYY')}</div>
                                                    <div>
                                                        <small className='text-muted'>
                                                            {moment.unix(`${document.timestamp}`)
                                                                .format('h:mm a')}
                                                        </small>
                                                    </div>

                                                    <Button
                                                        onClick={e => handleObserve(document)}
                                                        color='primary'
                                                        icon='Update'
                                                        isLight
                                                        download>
                                                        Görüntüle
                                                    </Button>

                                                </div>


                                                {/*<img*/}
                                                {/*    src={item.img}*/}
                                                {/*    alt={item.id}*/}
                                                {/*    width='100%'*/}
                                                {/*    height='auto'*/}
                                                {/*    className='object-fit-contain p-4'*/}
                                                {/*/>*/}

                                            </button>

                                            <div className={'row col-12 p-3 justify-content-around'}>
                                                {
                                                    document.is_approved ?
                                                        <Button
                                                            color='success'
                                                            icon='Verified'
                                                            isLight
                                                            download>
                                                            Onaylı
                                                        </Button> :
                                                        !document.is_active ?
                                                            <Button
                                                                color='danger'
                                                                icon='DeleteForever'
                                                                isLight
                                                                download>
                                                                Geçersiz
                                                            </Button> :
                                                            <>

                                                                <Tooltips title={'Onayla'} placement={'bottom'}>
                                                                    <Button
                                                                        onClick={e => handleApproveDocument(document)}
                                                                        color='success'
                                                                        icon='Verified'
                                                                        isLight
                                                                        download/>
                                                                </Tooltips>


                                                                <Tooltips title={'Geçersiz'} placement={'bottom'}>
                                                                    <Button
                                                                        onClick={e => handleCancelDocument(document)}
                                                                        color='danger'
                                                                        icon='DeleteForever'
                                                                        isLight
                                                                        download/>

                                                                </Tooltips>

                                                            </>

                                                }

                                            </div>

                                        </div>

                                    )
                                })
                            }

                        </div>

                        <Alert
                            icon='Verified'
                            isLight
                            color='info'
                            borderWidth={0}
                            isDismissible>
                            <AlertHeading tag='h2' className='h4'>
                                Uyarı !!!
                            </AlertHeading>
                            <span>Tüm evraklanırı tek tek onayladıktan sonra, Hesap durumunu ayrıca onaylamanız gerekmektedir.</span>
                        </Alert>
                    </ModalBody>


                    <ModalFooter>

                        <CardActions>


                            <Button
                                className='me-3'
                                icon={'Save'}
                                isLight
                                color={'danger'}
                                isDisable={false}
                                onClick={e => setShowDocuments(false)}>
                                Kapat
                            </Button>

                            <Button
                                className='me-3'
                                icon={'DomainVerification'}
                                isLight
                                color={'success'}
                                isDisable={false}
                                onClick={handleApproveAccount}>
                                Hesabı Onayla
                            </Button>
                        </CardActions>
                    </ModalFooter>

                </Modal>

                <Card>
                    <CardBody>
                        <div className='row g-4'>

                            <div className="col-12 cursor-pointer" onClick={checkForDocuments}>
                             <span
                                 className={`bg-body-hover border border-${user.is_verified ? 'success' : 'danger'} border-2 d-flex justify-content-center text-${user.is_verified ? 'success' : 'danger'} fw-bold px-3 py-2 rounded`}>
                                   {user.is_verified ? 'Doğrulanmış Hesap' : 'Doğrulanmamış Hesap'}
                                </span>
                            </div>

                            <div className='col-12'>

                                <div className='d-flex align-items-center'>
                                    <div className='flex-shrink-0'>
                                        <Avatar
                                            size={32}
                                            src={USERS.RYAN.src}
                                            srcSet={USERS.RYAN.srcSet}
                                            color={USERS.RYAN.color}
                                            className='rounded-circle'
                                        />
                                    </div>
                                    <div className='flex-grow-1 ms-3'>
                                        <div>
                                            <div className='col-12 fw-bold'>
                                                {user.username}
                                            </div>
                                            <div className='text-muted'>
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-12'>
                                <div className='row g-3'>

                                    <div className='col-12'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <Icon icon='SupervisedUserCircle' size='2x' color='warning'/>
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                                <div className='fw-bold fs-5 mb-0'>
                                                    {user.representative ? user.representative.name : '--'}
                                                </div>
                                                <div className='text-muted'>
                                                    Operator
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <Icon icon='AppRegistration' size='2x' color='secondary'/>
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                                <div className='fw-bold fs-5 mb-0'>
                                                    {moment.unix(`${user?.registration_ts || Date.now()}`)
                                                        .format('DD-MM-YYYY HH:mm:ss')}
                                                </div>
                                                <div className='text-muted'>
                                                    Registration
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-12'>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-shrink-0'>
                                                <Icon icon='Timeline' size='2x' color='danger'/>
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                                <div className='fw-bold fs-5 mb-0'>
                                                    {moment.unix(`${lastOnline / 1000}`)
                                                        .format('DD-MM-YYYY HH:mm:ss')}
                                                </div>
                                                <div className='text-muted'>
                                                    Latest Visit
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </CardBody>

                    <CardBody>
                        <div className='row g-3 mb-3'>

                            <div className='col-auto'>
                                <Button
                                    color='secondary'
                                    icon='Note'
                                    shadow='none'
                                    isLight
                                    size='sm'
                                    onClick={handleNote}
                                    hoverShadow='lg'>
                                    Add Note
                                </Button>
                            </div>


                        </div>
                    </CardBody>
                </Card>


                {/*<CustomerUpdateLeadModal*/}
                {/*    lead={user}*/}
                {/*    setIsOpen={setShowLeadUpdateModal}*/}
                {/*    isOpen={showLeadUpdateModal}*/}
                {/*    id={user?.id || 'loading'}*/}
                {/*/>*/}


                {/*<CustomerTagOrReminder*/}
                {/*    customer={user}*/}
                {/*    setIsOpen={setShowTagOrReminder}*/}
                {/*    isOpen={showTagOrReminder}*/}
                {/*    id={user?.id || 'loading'}*/}
                {/*/>*/}

                <StoreNoteModal
                    item={user}
                    setIsOpen={setEditModalStatus}
                    isOpen={editModalStatus}
                    isCall={callModalStatus}
                    id={user?.id?.toString() || 'loading'}
                />





                <Modal isOpen={showBonusModal} setIsOpen={setShowBonusModal} size='xl' titleId={'new-account-title'}>
                    <ModalHeader setIsOpen={setShowBonusModal} className='p-4'>
                        <ModalTitle id={'new-account'}>{'Manuel Bonus'}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className='col-md-12'>
                            <Card className='rounded-1 mb-0'>
                                <CardBody>
                                    <div className='row g-3'>

                                        <FormGroup className={'col-12'} label='Sep Hesap' isFloating>
                                            <Input
                                                value={activeMeta?.account}
                                                disabled={true}
                                            />
                                        </FormGroup>

                                        <FormGroup className={'col-12'} label='Bonus Yönü' isFloating>
                                            <Select
                                                value={bonusWay}
                                                onChange={e => setBonusWay(e.target.value)}
                                                ariaLabel={'Bonus Yönü'}>
                                                <Option value={''}>Bonus Yönü</Option>
                                                <Option value={'panel'}>Sadece Panel</Option>
                                                <Option value={'panel_trader'}>Panel + Trader</Option>
                                            </Select>
                                        </FormGroup>

                                        <FormGroup className={'col-6'} label='Bonus Tipi' isFloating>
                                            <Select
                                                value={bonusType}
                                                onChange={e => setBonusType(e.target.value)}
                                                ariaLabel={'Account Type'}>
                                                <Option value={''}>Bonus Tipi</Option>
                                                <Option value={'yatirim-bonusu'}>Yatirim Bonus</Option>
                                                <Option value={'arkadas-bonusu'}>Arkadaş Bonus</Option>
                                                <Option value={'tasima-bonusu'}>Taşıma Bonusu</Option>
                                                <Option value={'welcome-bonusu'}>Welcome Bonusu</Option>
                                            </Select>
                                        </FormGroup>

                                        <FormGroup className={'col-6'} label='Bonus Oran' isFloating>
                                            <Input
                                                disabled={bonusType === 'arkadas-bonusu'}
                                                value={bonusPercent}
                                                onChange={e => setBonusPercent(e?.target?.value)}
                                                type={'number'}
                                            />
                                        </FormGroup>

                                        <FormGroup className={'col-6'} label='Bonus Miktar' isFloating>
                                            <Input
                                                value={bonusAmount}
                                                onChange={e => setBonusAmount(e?.target?.value)}
                                                type={'number'}
                                            />
                                        </FormGroup>

                                        <FormGroup className={'col-6'} label='Bonus Açıklama' isFloating>
                                            <Input
                                                value={bonusDescription}
                                                onChange={e => setBonusDescription(e?.target?.value)}
                                                type={'text'}
                                            />
                                        </FormGroup>

                                    </div>


                                </CardBody>
                            </Card>
                        </div>
                    </ModalBody>
                    <ModalFooter className='px-4 pb-4'>
                        <Button color='info' onClick={handleStoreBonus}>
                            Kaydet
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={showMainVaultModal} setIsOpen={setShowMainVaultModal} size='xl'
                       titleId={'main-vault-title'}>
                    <ModalHeader setIsOpen={setShowBonusModal} className='p-4'>
                        <ModalTitle id={'new-account'}>{'Ana Kasa Bakiye Ekle/Çıkar'}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className='col-md-12'>
                            <Card className='rounded-1 mb-0'>
                                <CardBody>
                                    <div className='row g-3'>
                                        <FormGroup className={'col-12'} label='Tip'
                                                   isFloating>

                                            <Select
                                                className={'mb-3'}
                                                placeholder='işlem Tipi'
                                                value={type}
                                                onChange={e => setType(e.target.value.toString())}
                                                ariaLabel={'işlem Tipi'}>

                                                <Option value={''}>işlem Tipi</Option>
                                                <Option value={'deposit'}>Deposit / Yatırım</Option>
                                                <Option value={'withdraw'}>Withdraw / Çekim</Option>

                                            </Select>
                                        </FormGroup>


                                        <FormGroup className={'col-12'} label='Eklenecek ya da Düşecek Miktarı Giriniz !!!'
                                                   isFloating>
                                            <Input
                                                onChange={e => setNewAmount(e.target.value)}
                                                value={newAmount}
                                                type={'number'}
                                            />
                                        </FormGroup>


                                        <FormGroup className={'col-12'} label='Bu düzenleme neye istinaden yapılıyor ?'
                                                   isFloating>
                                            <Input
                                                onChange={e => setComment(e.target.value)}
                                                value={comment}
                                                type={'text'}
                                            />
                                        </FormGroup>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </ModalBody>
                    <ModalFooter className='px-4 pb-4'>
                        <Button color='danger' onClick={e => setShowMainVaultModal(false)}>
                            Iptal Et
                        </Button>

                        <Button color='info' onClick={handleStoreAmount}>
                            Kaydet
                        </Button>
                    </ModalFooter>
                </Modal>

            </>
        );
    }
;

export default CustomerDetailCard;
