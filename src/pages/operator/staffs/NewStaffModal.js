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

const NewStaffModal = ({id, item, isOpen, setIsOpen, reFetch, disableRole = false}) => {

    const [loading, setLoading] = useState(false)
    const [newStaff, setNewStaff] = useState({
        name: '',
        email: '',
        password: '',
        role_id: '',
    })

    const handleChange = (key, value) => {
        setNewStaff(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    const handleSave = () => {
        if (!newStaff.name || !newStaff.email || !newStaff.password || !newStaff.role_id)
            return false


        setLoading(true)
        associateServices.storeStaff(newStaff).then(res => {
            setLoading(false)
            if (res && res.status === 200) {
                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Harika</span>
				</span>,
                    res?.data,
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
					<span>System error, system error</span>
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

        <ModalBody className='px-4'>


            <FormGroup
                id='firstName'
                label='Rol'
                isFloating>
                <Select
                    className={'mb-3'}
                    placeholder='Data Durumu'
                    value={newStaff?.role_id}
                    onChange={e => handleChange('role_id', e.target.value)}
                    ariaLabel={'Data Durum'}>

                    <Option value={'0'}>Hesap Tipi Giriniz</Option>

                    <Option value={'1'}>Risk Management</Option>
                    <Option value={'2'}>Finance</Option>
                    <Option value={'3'}>Customer Services</Option>
                    <Option value={'4'}>Marketin</Option>
                    <Option value={'5'}>Admin</Option>

                </Select>
            </FormGroup>


            <FormGroup className='col-12' id='name' label='Name'>
                <Input
                    placeholder='Full Name'
                    onChange={e => handleChange('name', e.target.value)}
                    value={newStaff?.name}
                />
            </FormGroup>

            <FormGroup className='col-12' id='name' label='E-mail'>
                <Input
                    placeholder='E-mail'
                    onChange={e => handleChange('email', e.target.value)}
                    value={newStaff?.email}
                />
            </FormGroup>


            <FormGroup className='col-12' id='name' label='Password'>
                <Input
                    placeholder='Password'
                    onChange={e => handleChange('password', e.target.value)}
                    value={newStaff?.password}
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

export default NewStaffModal;
