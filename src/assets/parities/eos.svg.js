import * as React from "react"

const EosSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="url(#a)" d="M0 0h56v56H0z" />
        <path
            fillRule="evenodd"
            d="M27.705 7.664a.5.5 0 0 1 .699.108l8.494 11.596c.04.055.068.117.084.183l4.114 17.837a.5.5 0 0 1-.201.522l-12.52 8.746a.5.5 0 0 1-.66.077L15.12 37.91a.5.5 0 0 1-.2-.522l4.114-17.837a.5.5 0 0 1 .084-.183l8.427-11.51a.498.498 0 0 1 .158-.194zm.302 1.258L20.073 19.76 25.559 37h4.884l5.498-17.246-7.934-10.832zm8.41 12.63L31.492 37h8.488l-3.563-15.447zM39.02 38h-7.847l-2.247 7.05L39.02 38zm-11.022 6.667L30.124 38h-4.247l2.121 6.667zM24.51 37l-4.911-15.436L16.038 37h8.471zm-7.515 1h7.834l2.247 7.064L16.994 38z"
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

export default EosSvg
