import * as React from "react"

const DogSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="#C3A634" d="M0 0h56v56H0z"/>
        <path
            d="M22 25h9v5h-9v9h5.806C35.222 39 39 35.024 39 28c0-6.544-3.879-11.239-11.194-11H22v8zm-5 5h-3v-5h3V12h12.944c9.231-.214 14.055 7.726 14.055 16 .06 8.49-4.783 16.215-14.055 16H17V30z"
            fill="#fff"
        />
    </svg>
)

export default DogSvg
