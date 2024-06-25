import React, {useEffect, useState} from 'react';
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
} from "../../../components/bootstrap/Modal";
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Input from "../../../components/bootstrap/forms/Input";
import {CardActions} from "../../../components/bootstrap/Card";
import Button from "../../../components/bootstrap/Button";
import Spinner from "../../../components/bootstrap/Spinner";
import showNotification from "../../../components/extras/showNotification";
import Icon from "../../../components/icon/Icon";
import associateServices from "../../../services/services";

const ChangeStaffModal = ({id, isOpen, setIsOpen}) => {

    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')

    const handleSave = () => {

        if (!password)
            return false;

        setLoading(true)
        associateServices.changeStaffPassword({
            password,
            id
        }).then(res => {
            setLoading(true)
            if (res && res.status === 200) {
                showNotification(
                    <span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1'/>
					<span>Harika</span>
				</span>,
                    res?.data,
                );
                setPassword('')
                setLoading(false)
                setIsOpen(false)
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
            <ModalTitle id={Math.random()?.toString()}>{'Şifre Değiştir'}</ModalTitle>
        </ModalHeader>

        <ModalBody className='px-4'>


            <FormGroup className='col-12' id='name' label='Yeni Şifre'>
                <Input
                    placeholder='Yeni Şifre'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
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

export default ChangeStaffModal;
