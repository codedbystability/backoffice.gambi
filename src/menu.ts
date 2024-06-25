export const expertPlusMenu = {
    staffPages: {
        id: 'staffPages',
        scope: 'staff',
        text: 'Staff List',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            staffList: {
                id: 'staffList',
                text: 'Staff List',
                path: 'operator/staff/list',
                icon: 'ViewDay',
            },

            staffSessions: {
                id: 'staffSessions',
                text: 'Staff Sessions',
                path: 'operator/staff/sessions',
                icon: 'ViewDay',
            },

        },
    },
    expertPages: {
        id: 'expertPages',
        scope: 'staff',
        text: 'Customers',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            customerList: {
                id: 'customerList',
                text: 'Customer List',
                path: 'operator/customers/index',
                icon: 'ViewDay',
            },
        },
    },
    financePages: {
        id: 'financePages',
        scope: 'staff',
        text: 'Finance',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            depositList: {
                id: 'depositList',
                text: 'Deposit List',
                path: 'operator/customer/transactions/deposits',
                icon: 'ViewDay',
            },

            withdrawList: {
                id: 'withdrawList',
                text: 'Withdrawal List',
                path: 'operator/customer/transactions/withdraws',
                icon: 'ViewDay',
            },


        },
    },
    bonusDrops: {
        id: 'bonusDropPages',
        scope: 'staff',
        text: 'Bonus Drops',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            bonusList: {
                id: 'bonusList',
                text: 'Bonus Drop List',
                path: 'operator/bonus-drops/index',
                icon: 'ViewDay',
            },

            bonusUsageList: {
                id: 'bonusUsageList',
                text: 'Bonus Drop Usages',
                path: 'operator/bonus-drops/usages',
                icon: 'ViewDay',
            },


        },
    },
    tipPages: {
        id: 'tipPages',
        scope: 'staff',
        text: 'Tips',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            tipList: {
                id: 'tipList',
                text: 'Tip List',
                path: 'operator/tips',
                icon: 'ViewDay',
            },
        },
    },
    reloadPages: {
        id: 'reloadPages',
        scope: 'staff',
        text: 'Reloads',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            reloadList: {
                id: 'reloadList',
                text: 'Available Reloads',
                path: 'operator/available-reloads',
                icon: 'ViewDay',
            },
            reloadHistory: {
                id: 'reloadHistory',
                text: 'Reload History',
                path: 'operator/reload-history',
                icon: 'ViewDay',
            },

            reloadUsages: {
                id: 'reloadUsages',
                text: 'Reload Usages',
                path: 'operator/reload-usages',
                icon: 'ViewDay',
            },
        },
    },
    rakebackPages: {
        id: 'rakebackPages',
        scope: 'staff',
        text: 'Rakebacks',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            rakebackList: {
                id: 'rakebackList',
                text: 'Available Rakebacks',
                path: 'operator/available-rakebacks',
                icon: 'ViewDay',
            },
            rakebackUsages: {
                id: 'rakebackUsages',
                text: 'Rakeback Usages',
                path: 'operator/rakeback-usages',
                icon: 'ViewDay',
            },
        },
    },
    vipStateChangesPages: {
        id: 'vipStateChangesPages',
        scope: 'staff',
        text: 'Vip Updates',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            vipStateChangeList: {
                id: 'otpList',
                text: 'Vip Update List',
                path: 'operator/vip-state-updates',
                icon: 'ViewDay',
            },
        },
    },
    verificationCodePages: {
        id: 'verificationCodePages',
        scope: 'staff',
        text: 'Verification Codes',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            otpList: {
                id: 'otpList',
                text: 'OTP List',
                path: 'operator/verification-codes',
                icon: 'ViewDay',
            },
        },
    },
    loginLogPages: {
        id: 'loginLogPages',
        scope: 'staff',
        text: 'Login Logs',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            logList: {
                id: 'logList',
                text: 'Log List',
                path: 'operator/sessions',
                icon: 'ViewDay',
            },
        },
    },
    gamesPages: {
        id: 'gamesPages',
        scope: 'staff',
        text: 'Game List',
        path: 'list-pages',
        icon: 'Dvr',
        subMenu: {
            gameList: {
                id: 'gameList',
                text: 'Game List',
                path: 'operator/games',
                icon: 'ViewDay',
            },
        },
    },
}

