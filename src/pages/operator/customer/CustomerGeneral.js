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
import Input from "../../../components/bootstrap/forms/Input";
import InputMask from "react-input-mask";
import Checks from "../../../components/bootstrap/forms/Checks";
import CustomerNotes from "./CustomerNotes";
import showNotification from "../../../components/extras/showNotification";
import Icon from "../../../components/icon/Icon";

moment.locale('tr')


const CustomerDebits = ({item}) => {


    const [profileInfo, setProfileInfo] = useState({

        ghost_mode: '',
        hide_statistics: '',
        hide_race_statistics: '',
        exclude_rain: '',
        receive_marketing_mails: '',

        name: '',
        surname: '',
        occupation: '',
        residential: '',
        birthday: '',
        city: '',
    })
    useEffect(() => {
        setProfileInfo({
            id: item?.profile?.id,
            name: item?.profile?.name || '',
            surname: item?.profile?.surname || '',
            occupation: item?.profile?.occupation || '',
            residential: item?.profile?.residential || '',
            birthday: item?.profile?.birthday || '',
            city: item?.profile?.city || '',
            ghost_mode: item?.profile?.ghost_mode || false,
            hide_statistics: item?.profile?.hide_statistics || false,
            hide_race_statistics: item?.profile?.hide_race_statistics || false,
            exclude_rain: item?.profile?.exclude_rain || false,
            receive_marketing_mails: item?.profile?.receive_marketing_mails || false,
        })

    }, [item?.profile])

    const handleChangeInfo = (type, value) => {
        setProfileInfo(prevState => ({
            ...prevState,
            [type]: value
        }))
    }

    const handleUpdateProfileInfo = () => {

        console.log(profileInfo)

        associateServices.updateProfile(profileInfo)
            .then(res => {
                if (res?.status === 200)
                    showNotification(
                        <span className='d-flex align-items-center'>
												<Icon icon='Info' size='lg' className='me-1'/>
												<span>Success..</span>
											</span>,
                        `Profile updated`,
                    );
            })

    }


    return (
        <>
            <Card>
                <CardBody>
                    <div className='row g-4'>
                        <div className='col-lg-4'>
                            <FormGroup
                                label='Name'
                                isFloating>
                                <Input
                                    onChange={e => handleChangeInfo('name', e.target.value)}
                                    value={profileInfo.name || ''}
                                />
                            </FormGroup>
                        </div>

                        <div className='col-lg-4'>
                            <FormGroup
                                label='Surname'
                                isFloating>
                                <Input
                                    onChange={e => handleChangeInfo('surname', e.target.value)}
                                    value={profileInfo.surname || ''}
                                />
                            </FormGroup>
                        </div>

                        <div className='col-lg-4'>
                            <FormGroup
                                label='Birthday'
                                isFloating>
                                <InputMask mask="99-99-9999"
                                           className="form-control"
                                           onChange={e => handleChangeInfo('birthday', e.target.value)}
                                           value={profileInfo.birthday || ''}/>
                            </FormGroup>
                        </div>


                        <div className='col-lg-4'>
                            <FormGroup
                                label='Residental'
                                isFloating>
                                <Input
                                    onChange={e => handleChangeInfo('residential', e.target.value)}
                                    value={profileInfo.residential || ''}
                                />
                            </FormGroup>
                        </div>

                        <div className='col-lg-4'>
                            <FormGroup
                                label='City'
                                isFloating>
                                <Input
                                    onChange={e => handleChangeInfo('city', e.target.value)}
                                    value={profileInfo.city || ''}
                                />
                            </FormGroup>
                        </div>


                        <div className='col-lg-4'>
                            <FormGroup
                                label='Occupation'
                                isFloating>
                                <Input
                                    onChange={e => handleChangeInfo('occupation', e.target.value)}
                                    value={profileInfo.occupation || ''}

                                />
                            </FormGroup>
                        </div>

                        <div className='col-lg-4'>
                            <Checks
                                label={'Ghost Mode'}
                                onChange={e => handleChangeInfo('ghost_mode', e.target.checked)}
                                checked={profileInfo.ghost_mode || false}
                            />
                        </div>


                        <div className='col-lg-4'>
                            <Checks
                                label={'Hide Statistics'}
                                onChange={e => handleChangeInfo('hide_statistics', e.target.checked)}
                                checked={profileInfo.hide_statistics || false}
                            />
                        </div>

                        <div className='col-lg-4'>
                            <Checks
                                label={'Hide Race Statistics'}
                                onChange={e => handleChangeInfo('hide_race_statistics', e.target.checked)}
                                checked={profileInfo.hide_race_statistics || false}
                            />
                        </div>

                        <div className='col-lg-4'>
                            <Checks
                                label={'Exclude Rain'}
                                onChange={e => handleChangeInfo('exclude_rain', e.target.checked)}
                                checked={profileInfo.exclude_rain || false}
                            />
                        </div>


                        <div className='col-lg-4'>
                            <Checks
                                label={'Receive Marketing E-mails'}
                                onChange={e => handleChangeInfo('receive_marketing_mails', e.target.checked)}
                                checked={profileInfo.receive_marketing_mails || false}
                            />
                        </div>


                        <div className='col-lg-4 d-flex align-items-center justify-content-end'>

                            <Button
                                type='submit'
                                icon='Save'
                                color='info'
                                isOutline
                                onClick={handleUpdateProfileInfo}
                            >
                                Update
                            </Button>
                        </div>

                    </div>
                </CardBody>

            </Card>

            <CustomerNotes user={item}/>
        </>
    );
};

export default CustomerDebits;
