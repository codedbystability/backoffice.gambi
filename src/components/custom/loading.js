import React, {useState} from "react";
import Page from "../../layout/Page/Page";
import Spinner from "../bootstrap/Spinner";


const CustomLoading = () => {

    return (
        <Page container='fluid' className={'d-flex align-items-center justify-content-center'}>
            <Spinner
                color={'danger'}
                isGrow/>
        </Page>
    )
}
export default React.memo(CustomLoading)
