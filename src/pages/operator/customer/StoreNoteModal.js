import React, {useState} from 'react';
import FormGroup from "../../../components/bootstrap/forms/FormGroup";
import Card, {
    CardBody,
    CardHeader,
    CardLabel,
    CardTitle,
} from "../../../components/bootstrap/Card";
import Button from "../../../components/bootstrap/Button";
import InputGroup from "../../../components/bootstrap/forms/InputGroup";
import Textarea from "../../../components/bootstrap/forms/Textarea";
import showNotification from "../../../components/extras/showNotification";
import Icon from "../../../components/icon/Icon";
import associateServices from "../../../services/services";
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../../../components/bootstrap/Modal";

const StoreNoteModal = ({item, isOpen, setIsOpen}) => {


    const [customerNote, setCustomerNote] = useState('')


    const storeCustomerNote = () => {
        if (!customerNote)
            return false

        associateServices.storeCustomerNote({
            note: customerNote,
            customer_id: item.id
        }).then(res => {
            if (res && res.status === 200) {
                showNotification(
                    <span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1'/>
				<span>Note stored successfully !</span>
			</span>,
                    "Note stored successfully.",
                );

                setCustomerNote('')
                setIsOpen(false)

            }
        })
    }


    return (

        <Modal
            data-backdrop="static" data-keyboard="false"
            isStaticBackdrop={true}
            isCentered={true}
            isOpen={isOpen} setIsOpen={setIsOpen} size='xl' titleId={Math.random()?.toString()}>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={Math.random()?.toString()}>Store Customer Note</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <div className='col-md-12'>
                        <Card className='rounded-1 mb-0'>
                            <CardHeader>
                                <CardLabel icon='ReceiptLong'>
                                    <CardTitle>Add Note</CardTitle>
                                </CardLabel>
                            </CardHeader>
                            <CardBody>
                                <div className='row g-3'>
                                    <FormGroup>
                                        <InputGroup>
                                            <Textarea
                                                ariaLabel='With textarea'
                                                onChange={e => setCustomerNote(e.target.value)}
                                                value={customerNote}
                                            />
                                        </InputGroup>


                                    </FormGroup>

                                    <Button
                                        className={'mr-1'}
                                        size='sm'
                                        icon='Note'
                                        color={'primary'}
                                        isLight
                                        onClick={storeCustomerNote}>
                                        Store Note
                                    </Button>

                                </div>
                            </CardBody>
                        </Card>
                    </div>


                </div>
            </ModalBody>

        </Modal>


    );
};
export default StoreNoteModal;
