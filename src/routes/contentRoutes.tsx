import React, {lazy} from 'react';
import {
    expertPlusMenu
} from '../menu';
import Login from '../pages/presentation/auth/Login';
import CustomerTransactionList from "../pages/operator/transactions/list";


const OPERATOR = {
    CUSTOMER_LIST: lazy(() => import('../pages/operator/customer/CustomerList')),
    CUSTOMER_DETAIL: lazy(() => import('../pages/operator/customer/CustomerDetail')),
    VERIFICATION_CODE_LIST: lazy(() => import('../pages/operator/verification-codes/list')),
    SESSION_LIST: lazy(() => import('../pages/operator/sessions/list')),
    TIP_LIST: lazy(() => import('../pages/operator/tips/list')),
    VIP_STATE_LIST: lazy(() => import('../pages/operator/vip-state-updates/list')),
    AVAILABLE_RELOAD_LIST: lazy(() => import('../pages/operator/reloads/availables')),
    RELOAD_USAGES_LIST: lazy(() => import('../pages/operator/reloads/usages')),
    RELOAD_HISTORY_LIST: lazy(() => import('../pages/operator/reloads/history')),


    AVAILABLE_RAKEBACK_LIST: lazy(() => import('../pages/operator/rakeback/availables')),
    RAKEBACK_USAGES_LIST: lazy(() => import('../pages/operator/rakeback/usages')),


    STAFF_LIST: lazy(() => import('../pages/operator/staffs/StaffList')),
    TRANSACTIONS: lazy(() => import('../pages/operator/transactions/list')),


    BONUS_DROP_LIST: lazy(() => import('../pages/operator/bonus-drops/BonusDropList')),
    BONUS_DROP_REDEEM_LIST: lazy(() => import('../pages/operator/bonus-drops/BonusDropRedeems')),
    GAME_LIST: lazy(() => import('../pages/operator/games/GameList')),

};


// @ts-ignore
// @ts-ignore
const presentation = [
    {
        path: 'auth-pages/login',
        element: <Login/>,
    },

    {
        path: expertPlusMenu.expertPages.subMenu.customerList.path,
        element: <OPERATOR.CUSTOMER_LIST/>,
    },

    {
        path: 'operator/customer/detail/:id',
        element: <OPERATOR.CUSTOMER_DETAIL/>,
    },


    {
        path: expertPlusMenu.verificationCodePages.subMenu.otpList.path,
        element: <OPERATOR.VERIFICATION_CODE_LIST/>,
    },

    {
        path: expertPlusMenu.loginLogPages.subMenu.logList.path,
        element: <OPERATOR.SESSION_LIST/>,
    },


    {
        path: expertPlusMenu.tipPages.subMenu.tipList.path,
        element: <OPERATOR.TIP_LIST/>,
    },

    {
        path: expertPlusMenu.vipStateChangesPages.subMenu.vipStateChangeList.path,
        element: <OPERATOR.VIP_STATE_LIST/>,
    },


    {
        path: expertPlusMenu.staffPages.subMenu.staffList.path,
        element: <OPERATOR.STAFF_LIST/>,
    },




    {
        path: expertPlusMenu.bonusDrops.subMenu.bonusList.path,
        element: <OPERATOR.BONUS_DROP_LIST/>,
    },

    {
        path: expertPlusMenu.bonusDrops.subMenu.bonusUsageList.path,
        element: <OPERATOR.BONUS_DROP_REDEEM_LIST/>,
    },


    {
        path: expertPlusMenu.gamesPages.subMenu.gameList.path,
        element: <OPERATOR.GAME_LIST/>,
    },


    {
        path: expertPlusMenu.financePages.subMenu.depositList.path,
        element: <OPERATOR.TRANSACTIONS type={'deposit'}/>,
    },

    {
        path: expertPlusMenu.financePages.subMenu.withdrawList.path,
        element: <OPERATOR.TRANSACTIONS type={'withdrawal'}/>,
    },


    {
        path: expertPlusMenu.reloadPages.subMenu.reloadList.path,
        element: <OPERATOR.AVAILABLE_RELOAD_LIST/>,
    },

    {
        path: expertPlusMenu.reloadPages.subMenu.reloadHistory.path,
        element: <OPERATOR.RELOAD_HISTORY_LIST/>,
    },

    {
        path: expertPlusMenu.reloadPages.subMenu.reloadUsages.path,
        element: <OPERATOR.RELOAD_USAGES_LIST/>,
    },


    {
        path: expertPlusMenu.rakebackPages.subMenu.rakebackList.path,
        element: <OPERATOR.AVAILABLE_RAKEBACK_LIST/>,
    },

    {
        path: expertPlusMenu.rakebackPages.subMenu.rakebackUsages.path,
        element: <OPERATOR.RAKEBACK_USAGES_LIST/>,
    },


];
const contents = [...presentation];

export default contents;
