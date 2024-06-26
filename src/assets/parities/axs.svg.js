import * as React from "react"

const AxsSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="url(#a)" d="M0 0h56v56H0z"/>
        <path fill="url(#b)" d="M0 0h56v56H0z"/>
        <path
            d="M12.28 17.63c1.16-1.49 9.83 3.25 14.24 7.35.22.2.2.55-.03.74l-1.4 1.17a.5.5 0 0 1-.61.02l-2.88-2.07-3.44 3.66c-.34.35-.95 1.09-1.37.79a1.9 1.9 0 0 1-.52-2.15c.54-1.25 3.41-3.87 3.41-3.87-1.44-1.15-4.4-2.23-4.92 1.43-.34 2.38-.26 12.15 3.9 9.8 4-2.27 19.95-19.94 23.14-18.4 3.19 1.53 4.3 18.4 1.91 21.46-.78 1-5.98.36-14.25-6.62a.5.5 0 0 1-.03-.73l1.4-1.37c.19-.19.5-.2.7-.01 1.88 1.64 8.73 6.9 9.47 3.37.49-2.36.54-12.83-1.85-12.06-1.3.42-3.6 2.28-5.32 3.75-3.73 3.2-16.9 17.67-19.96 15.97-3.06-1.69-3.8-19.4-1.6-22.23z"
            fill="#fff"
        />
        <defs>
            <linearGradient
                id="a"
                x1={28}
                y1={0}
                x2={28}
                y2={56}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#00D2F7"/>
                <stop offset={1} stopColor="#004CDC"/>
            </linearGradient>
            <linearGradient
                id="b"
                x1={56}
                y1={28}
                x2={0}
                y2={28}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#8476F4"/>
                <stop offset={0.48} stopColor="#0083EC" stopOpacity={0}/>
                <stop offset={1} stopColor="#8763EF"/>
            </linearGradient>
        </defs>
    </svg>
)

export default AxsSvg
