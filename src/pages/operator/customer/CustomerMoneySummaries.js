import React, {useEffect, useState} from "react";
import Card, {CardBody, CardHeader, CardLabel, CardTitle} from "../../../components/bootstrap/Card";
import Icon from "../../../components/icon/Icon";
import {priceFormat} from "../../../helpers/helpers";
import associateServices from "../../../services/services";


const CustomerMoneySummaries = ({id}) => {


    const [summary, setSummary] = useState({})

    useEffect(() => {
        associateServices.getCustomerSummary({id}).then(res => setSummary(res?.data?.summary || {}))
    }, [id])

    const tabs = [
        {
            id: 0,
            key: 'account',
            items: [
                {
                    title: 'Total In',
                    key: 'total_in_usd',
                    value: '100.00',
                    color: 'primary',
                    icon: 'AttachMoney',
                    class: 'col-lg-3',
                },
                {
                    title: 'Total Out',
                    key: 'total_out_usd',
                    value: '100.00',
                    color: 'secondary',
                    icon: 'Money',
                    class: 'col-lg-3',

                },
                {
                    title: 'Total Net',
                    key: 'accountNet',
                    value: '100.00',
                    color: 'warning',
                    icon: 'Summarize',
                    class: 'col-lg-3',
                },
                {
                    title: 'Wallet Balance',
                    key: 'accountCurrent',
                    value: '100.00',
                    color: 'success',
                    icon: 'Summarize',
                    class: 'col-lg-3',
                },
            ]
        },
    ]

    console.log('summary = ', summary)
    return (
        <>
            {
                tabs.map(tab => (
                    <div key={tab.id.toString()} className='row col-12 shadow-3d-container justify-content-around'>

                        {
                            tab.items.map(item => (

                                <Card
                                    key={item.title}
                                    className={`${item.class} rounded-2 shadow-3d-${item.color} shadow-3d-hover cursor-pointer`}>

                                    <CardBody>
                                        <div className='d-flex align-items-center pb-3'>
                                            <div className='flex-shrink-0'>
                                                <Icon
                                                    icon={item.icon}
                                                    size='2x'
                                                    color={item.color}
                                                />
                                            </div>
                                            <div className='flex-grow-1 ms-3'>
                                                <div className='fw-bold fs-5 mb-0'>
                                                    {
                                                        item.key === 'accountNet' ? priceFormat(parseFloat(summary.total_in_usd) - parseFloat(summary.total_out_usd)) : priceFormat(parseFloat(summary[item.key]))
                                                    }

                                                </div>
                                                <div className='text-muted'>
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                        }

                    </div>

                ))
            }
        </>

    )
}

export default CustomerMoneySummaries
