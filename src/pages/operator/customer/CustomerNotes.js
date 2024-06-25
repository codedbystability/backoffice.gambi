import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Card, {
    CardBody, CardHeader, CardLabel,
    CardTitle,
} from '../../../components/bootstrap/Card';
import Timeline, {TimelineItem} from "../../../components/extras/Timeline";
import PaginationButtons from "../../../components/PaginationButtons";
import {getColorNameWithIndex} from "../../../common/data/enumColors";
import associateServices from "../../../services/services";


const CustomerNotes = ({user}) => {

    const [notes, setNotes] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(1)

    useEffect(() => {
        getNotes()
    }, [page])


    const getNotes = () => {
        setNotes([])
        associateServices.getCustomerNotes({
            customer_id: user.id,
            page,
            limit: perPage
        }).then(res => {
            if (res?.status === 200) {
                setNotes(res.data.data)
                setTotal(res.data.total)
            }
        })
    }


    return (
        <>


            <Card>

                <CardHeader borderSize={1}>
                    <CardLabel icon='Notes' iconColor='info'>
                        <CardTitle>Customer Notes</CardTitle>
                    </CardLabel>

                </CardHeader>

                <CardBody isScrollable className={'h-100'}>


                    <Timeline>
                        {
                            notes.map((note, i) => {
                                return (
                                    <TimelineItem label={(i + 1).toString()}
                                                  key={i.toString()}
                                                  color={getColorNameWithIndex(note.timestamp || 1)}
                                    >
                                        {note.note}
                                        <div className='todo-subtitle text-muted small'>
                                            <span className="fw-bold">{note.operator?.name}</span> - {moment.unix(`${note?.timestamp}`)
                                            .format(
                                                'DD-MM-YYYY, h:mm a',
                                            )}
                                        </div>
                                    </TimelineItem>
                                )
                            })
                        }

                    </Timeline>


                    <PaginationButtons
                        totalItems={total}
                        data={notes}
                        label='items'
                        setCurrentPage={setPage}
                        currentPage={page}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                </CardBody>
            </Card>
        </>

    );
};

export default CustomerNotes;
