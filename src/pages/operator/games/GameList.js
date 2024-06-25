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
import Avatar from "../../../components/Avatar";

const GameList = (props) => {
    const {darkModeStatus} = useDarkMode();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(100);
    const [total, setTotal] = useState(0);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getDatas()
    }, [currentPage])


    const getDatas = () => {
        if (loading)
            return false

        associateServices.getGameList({
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
                           <CardTitle>
                               Games
                           </CardTitle>
                        </CardHeader>
                        <CardBody isScrollable className='table-responsive'>
                            <table className='table table-modern table-hover'>
                                <thead>
                                <tr>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Name
                                    </th>

                                    <th
                                        style={{
                                            maxWidth: 200
                                        }}
                                        className='cursor-pointer text-decoration-underline'>
                                        Description
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Category
                                    </th>


                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        is Live ?
                                    </th>
                                    <th>
                                        is HD ?
                                    </th>
                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Has Freespins ?
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Has Jackpot ?
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Buy Bonus ?
                                    </th>


                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Max Multiplier ?
                                    </th>

                                    <th
                                        className='cursor-pointer text-decoration-underline'>
                                        Payout ?
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
                                                            }`}>

                                                            <Avatar size={48} src={i.image}/>
                                                        </div>


                                                    </div>
                                                </div>
                                                <div className='flex-grow-1a'>
                                                    <div className='fs-6 fw-bold'>
                                                        {i.name}
                                                    </div>
                                                    <div className='text-muted'>
                                                        <small>{i.game_provider.name}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>


                                        <td>
                                                <span className={"text-muted"}>
                                                    {i.description}
                                                </span>
                                        </td>

                                        <td>
                                                <span className={"text-muted"}>
                                                    {i?.category?.name?.toUpperCase()}
                                                </span>
                                        </td>


                                        <td>
                                            <Badge isLight color={i.is_live ? 'success' : 'danger'}>
                                                {i.is_live ? 'YES' : 'NO'}
                                            </Badge>
                                        </td>


                                        <td>
                                            <Badge isLight color={i.is_hd ? 'success' : 'danger'}>
                                                {i.is_hd ? 'YES' : 'NO'}
                                            </Badge>
                                        </td>


                                        <td>
                                            <Badge isLight color={i.has_freespins ? 'success' : 'danger'}>
                                                {i.has_freespins ? 'YES' : 'NO'}
                                            </Badge>
                                        </td>

                                        <td>
                                            <Badge isLight color={i.has_jackpot ? 'success' : 'danger'}>
                                                {i.has_jackpot ? 'YES' : 'NO'}
                                            </Badge>
                                        </td>


                                        <td>
                                            <Badge isLight color={i.buy_bonus ? 'success' : 'danger'}>
                                                {i.buy_bonus ? 'YES' : 'NO'}
                                            </Badge>
                                        </td>


                                        <td>
                                            <span className="fw-semibold">
                                                {i?.max_multiplier}
                                            </span>
                                        </td>


                                        <td>
                                            <span className="fw-semibold">
                                                %{i?.payout}
                                            </span>
                                        </td>

                                        <td>


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

export default GameList;
