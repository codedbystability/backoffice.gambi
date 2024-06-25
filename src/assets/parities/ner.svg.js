import * as React from "react"

const NerSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="url(#a)" d="M0 0h56v56H0z" />
        <path
            d="m36.437 15.431-5.842 8.68c-.404.591.373 1.307.932.809l5.1-5.009c.155-.124.373-.031.373.187v15.649c0 .217-.28.31-.404.155L19.842 15.058C19.283 14.373 18.475 14 17.574 14 15.76 14 14 14.91 14 16.987v22.026A2.986 2.986 0 0 0 16.983 42a2.995 2.995 0 0 0 2.549-1.431l5.842-8.68c.404-.591-.373-1.307-.932-.809l-5.07 5.107c-.154.124-.372.03-.372-.187V20.382c0-.218.28-.31.404-.155l16.723 20.715A2.92 2.92 0 0 0 38.395 42C40.214 42 42 41.104 42 39.013V16.987C41.969 15.337 40.633 14 38.986 14a2.996 2.996 0 0 0-2.549 1.431z"
            fill="#fff"
        />
        <defs>
            <linearGradient
                id="a"
                x1={10.418}
                y1={9.712}
                x2={68.147}
                y2={76.017}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#1A1E21" />
                <stop offset={1} stopColor="#06060A" />
            </linearGradient>
        </defs>
    </svg>
)

export default NerSvg
