import * as React from "react"

const GrtSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="url(#a)" d="M0 0h56v56H0z" />
        <path
            fillRule="evenodd"
            d="M39 24.5a11.5 11.5 0 1 1-23 0 11.5 11.5 0 0 1 23 0zm-4 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0zm7-9.5c0 1.12-.87 2-2 2-1.12 0-2-.88-2-2 0-1.13.88-2 2-2 1.06 0 2 .87 2 2zm-4.56 21.56c.75.74.75 1.88 0 2.57l-7.31 7.31c-.74.75-1.89.75-2.57 0a1.76 1.76 0 0 1 0-2.57l7.31-7.31a1.76 1.76 0 0 1 2.57 0z"
            fill="#fff"
        />
        <defs>
            <linearGradient
                id="a"
                x1={52.9}
                y1={12.3}
                x2={3.27}
                y2={45.38}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#351682" />
                <stop offset={1} stopColor="#4B84D5" />
            </linearGradient>
        </defs>
    </svg>
)

export default GrtSvg
