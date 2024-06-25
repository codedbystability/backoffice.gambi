import React, {useEffect, useState} from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from "../../../components/bootstrap/Modal";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Input from "../../../components/bootstrap/forms/Input";
import Select from "../../../components/bootstrap/forms/Select";
import Option from "../../../components/bootstrap/Option";
import {CardActions} from "../../../components/bootstrap/Card";
import Button from "../../../components/bootstrap/Button";
import Spinner from "../../../components/bootstrap/Spinner";
import showNotification from "../../../components/extras/showNotification";
import Icon from "../../../components/icon/Icon";
import associateServices from "../../../services/services";
import moment from "moment";

const CreateBonusDropModal = ({id, item, isOpen, setIsOpen, reFetch, disableRole = false}) => {

    const [currencies, setCurrencies] = useState([])
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')
    const [newStaff, setNewStaff] = useState({
        code: '',
        currency: '',
        amount: '',
        start: '',
        start_date: '',
        end: '',

    })

    const handleChange = (key, value) => {
        setNewStaff(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    const handleChangeDate = (type, value) => {
        console.log('handleChangeDate = ', type, value)

        console.log('aa = ', moment(value).unix())
        if (type === 'start') {
            handleChange('start_date', value)
            handleChange('start', moment(value).unix())
        } else {

            handleChange('end_date', value)
            handleChange('end', moment(value).unix())
        }
    }
    useEffect(() => {
        if (isOpen)
            associateServices.getCurrencyList({}).then(res => setCurrencies(res?.data || []))
    }, [isOpen])

    const handleSave = () => {


        setLoading(true)
        associateServices.storeBonusDrop(newStaff).then(res => {
            setLoading(false)
            if (res && res.status === 200) {
                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Success</span>
				</span>,
                    'Bonus drop stored successfully.',
                );
                reFetch && reFetch()
                setIsOpen(false)
                setNewStaff({
                    name: '',
                    email: '',
                    password: '',
                    role_id: ''
                })
            } else {
                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>{res?.errors || 'System error, system error'}</span>
				</span>,
                    res?.data,
                );
            }
        })
    }


    return <Modal
        data-backdrop="static" data-keyboard="false"
        isStaticBackdrop={true}
        isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={Math.random().toString()}>
        <ModalHeader setIsOpen={setIsOpen} className='p-4'>
            <ModalTitle id={Math.random()?.toString()}>{item?.profile?.name || 'New Staff'}</ModalTitle>
        </ModalHeader>

        <ModalBody className='row px-4'>


            <FormGroup
                id='firstName'
                label='Currency'
                isFloating>
                <Select
                    className={''}
                    placeholder='Currency'
                    value={newStaff.currency}
                    onChange={e => handleChange('currency', e.target.value)}
                    ariaLabel={'Currency'}
                    aria-label={'Currency'}>

                    <Option value={''}>Select Currency</Option>
                    {
                        currencies.map(currency =>
                            <Option key={currency} value={currency}>{currency}</Option>
                        )
                    }


                </Select>
            </FormGroup>


            <FormGroup className='col-12 ' id='code' label='Code'>
                <Input
                    placeholder='Code'
                    onChange={e => handleChange('code', e.target.value)}
                    value={newStaff?.code}
                />
            </FormGroup>


            <FormGroup className='col-12 ' id='name' label='Amount'>
                <Input
                    placeholder='Amount'
                    onChange={e => handleChange('amount', e.target.value)}
                    type={'number'}
                    value={newStaff?.amount}
                />
            </FormGroup>

            <FormGroup className='col-6 ' id='start' label='From Date'>
                <Input
                    placeholder='Amount'
                    type={'date'}
                    onChange={e => handleChangeDate('start', e.target.value)}
                    value={newStaff?.start_date}
                />
            </FormGroup>


            <FormGroup className='col-6 ' id='end' label='To Date'>
                <Input
                    placeholder='Amount'
                    type={'date'}
                    onChange={e => handleChangeDate('end', e.target.value)}
                    value={newStaff?.end_date}
                />
            </FormGroup>


        </ModalBody>


        <ModalFooter>
            <CardActions>
                <div className={'col-auto'}>
                    <Button
                        className='me-3'
                        icon={'Save'}
                        isLight
                        color={'danger'}
                        isDisable={false}
                        onClick={e => setIsOpen(false)}>
                        Cancel

                    </Button>

                    <Button
                        className='me-3'
                        icon={'Save'}
                        isLight
                        color={'info'}
                        isDisable={loading}
                        onClick={handleSave}>
                        Publish
                        {loading && <Spinner isSmall inButton/>}

                    </Button>
                </div>
            </CardActions>
        </ModalFooter>

    </Modal>

};

export default CreateBonusDropModal;
