import * as React from "react"

const BarSvg = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
        <path fill="#144080" d="M0 0h56v56H0z" />
        <path
            d="m33.07 13.52.17.1c1.83 1.2 3.3 1.42 5.54 1.42.79 0 1.64-.14 2.45-.42l.21-.07 1.06 1.47-.1.14c-3.96 5.18-.88 10.77 1.3 13l.2.2-.2.21c-.29.28-.78.79-1.15 1.17l-.13.13.01.18v.06c0 .04 0 .09.02.17v.04c.18 3.45-.72 6.28-2.7 8.43-2.09 2.27-5.4 3.64-9.3 3.85l-.15.01-.11.1c-1 .9-2 1.64-2.02 1.65l-.17.13-.18-.13c-.04-.04-1.03-.77-2.02-1.65l-.1-.1h-.16c-3.9-.22-7.2-1.59-9.3-3.86-1.98-2.15-2.88-4.98-2.7-8.43v-.04c.02-.07.02-.12.02-.16v-.07l.01-.18-.12-.13-1.15-1.17-.2-.2.2-.2c2.17-2.24 5.25-7.83 1.3-13l-.1-.15 1.06-1.47.21.07c.81.28 1.66.42 2.45.42 2.24 0 3.71-.21 5.54-1.41l.17-.11.16.11A8.37 8.37 0 0 0 28 15.25c1.74 0 3.3-.51 4.91-1.62l.16-.11z"
            fill="#E8B909"
        />
        <path
            d="M15.98 26.3c1.24-2.8 1.7-6.39-.38-9.9.52.09 1.07.14 1.62.14 2.13 0 3.8-.19 5.68-1.24a9.75 9.75 0 0 0 10.2 0c1.88 1.05 3.55 1.24 5.68 1.24.55 0 1.1-.05 1.63-.15-2.09 3.52-1.63 7.12-.4 9.92H15.99z"
            fill="#fff"
        />
        <path
            d="M40.02 26.3c-1.24-2.8-1.7-6.39.39-9.91-.53.1-1.07.15-1.63.15-2.13 0-3.8-.19-5.68-1.24a9.76 9.76 0 0 1-5.1 1.46h-.06v9.55h12.08z"
            fill="#FD0"
        />
        <path
            d="M37.37 39.83c2.37-1.7 3.77-4.43 3.56-8.42l-.06-.47h-3.5v8.9zm-22.35-8.36c-.18 4.03 1 6.09 3 7.82V31h-2.95l-.05.47z"
            fill="#0054A4"
        />
        <path
            d="M22 41.36a13.68 13.68 0 0 1-3.98-2.05v-8.47H22v10.52zm16-2a19.15 19.15 0 0 1-4 2.19v-10.6h4v8.4zM28 32.9c.74 0 1.42.2 2 .53v-2.5h-4v2.51a3.99 3.99 0 0 1 2-.54zm-2 6.44c.58.34 1.27.54 2 .54.74 0 1.42-.3 2-.64v2.86h-.21c-1.01.02-2.17.01-3.45 0H26v-2.76z"
            fill="#A30046"
        />
        <path
            d="M30 30.92v2.5a3.9 3.9 0 0 1 1.51 2.96c0 1.25-.53 2.2-1.51 2.95v2.75c1.32-.07 2.84-.25 4-.56v-10.6h-4zm-5.6 5.47c0-1.23.54-2.3 1.6-2.92V31h-4v10.45c1.24.3 2.59.48 4 .55v-2.72c-.92-.75-1.6-1.67-1.6-2.9z"
            fill="#0054A4"
        />
        <path
            d="M16.83 20c.25 1.21.26 1.87.1 3H21v3.3h3V23h3.95v-3H24v-4.06c-.43-.19-.7-.4-1.1-.64-.8.45-1.13.74-1.9.92V20h-4.17zm19.67 6.41V16.38c-.5-.1-1-.22-1.5-.38v10.41h1.5zm-6-.08v-9.89c-.48.12-.98.2-1.5.26v9.63h1.5zm8.5-.05V16.5c-.35 0-.68-.03-1-.07v9.84h1zm-5.53.05V15.5c-.12.07-.24-.19-.36-.13-.37.18-.75.34-1.14.49v10.48h1.5z"
            fill="#E31837"
        />
        <path
            d="m44.5 29.36-.49-.5c-2.1-2.14-5.05-7.5-1.28-12.46l.3-.39-1.43-1.97-.5.17c-.78.27-1.58.4-2.32.4-2.16 0-3.57-.2-5.3-1.34l-.41-.27-.4.28A7.94 7.94 0 0 1 28 14.83a7.96 7.96 0 0 1-4.67-1.55l-.4-.27-.4.26c-1.74 1.14-3.16 1.34-5.31 1.34-.75 0-1.55-.13-2.31-.4l-.52-.17-1.42 1.97.3.4c3.77 4.95.8 10.3-1.28 12.45l-.49.5.5.5c.27.26.75.75 1.14 1.16v.07l-.02.14v.05c-.2 3.57.75 6.51 2.8 8.74 2.18 2.36 5.58 3.78 9.6 4 1 .89 2 1.63 2.05 1.67L28 46l.43-.31c.04-.04 1.05-.78 2.04-1.68 4.03-.21 7.42-1.63 9.6-3.99 2.05-2.23 3-5.17 2.8-8.74v-.19l-.01-.07c.4-.4.87-.9 1.14-1.16l.5-.5zm-2.38 1.4c.03.36.01.34.04.55.43 7.96-5.19 11.72-11.98 12-1.04.96-2.18 1.8-2.18 1.8s-1.15-.84-2.19-1.8c-6.79-.28-12.4-4.04-11.97-12 .02-.2 0-.2.04-.55-.4-.4-1.04-1.07-1.38-1.4 2.44-2.5 5.28-8.21 1.34-13.38l.83-1.1c.79.27 1.67.44 2.54.44 2.26 0 3.81-.22 5.7-1.46A8.73 8.73 0 0 0 28 15.53c1.94 0 3.57-.64 5.07-1.67 1.9 1.24 3.45 1.46 5.7 1.46.9 0 1.77-.17 2.55-.44l.84 1.1c-3.95 5.17-1.1 10.88 1.33 13.37l-1.37 1.4z"
            fill="#231F20"
        />
        <path
            d="m15.89 26.26-.07.15h24.36l-.07-.15c-1.05-2.4-1.85-6.04.39-9.82l.12-.2-.24.04c-.53.1-1.07.16-1.6.16-2.17 0-3.79-.2-5.63-1.23l-.05-.03-.06.03a9.63 9.63 0 0 1-10.08 0l-.06-.03-.05.03c-1.84 1.03-3.46 1.23-5.63 1.23-.51 0-1.05-.05-1.6-.15l-.23-.04.12.2c2.23 3.77 1.43 7.41.38 9.81zm12.17-9.4a9.8 9.8 0 0 0 5.04-1.43c1.85 1.02 3.49 1.22 5.68 1.22.46 0 .94-.04 1.41-.12-2.09 3.7-1.37 7.27-.34 9.67H28.06v-9.34zm-12.25-.32c.49.07.96.11 1.41.11 2.19 0 3.83-.2 5.68-1.22 1.6.93 3.21 1.4 4.95 1.43v9.34h-11.7c1.02-2.4 1.75-5.96-.34-9.66zm-.79 14.4c0 .12-.02.18-.03.24l-.03.23c-.16 3.06.62 5.54 2.3 7.37 1.94 2.09 5.07 3.28 9.06 3.45h.26a393 393 0 0 0 3.1 0c4-.17 7.12-1.36 9.06-3.46 1.68-1.82 2.46-4.3 2.3-7.37l-.03-.22v-.03c-.02-.06-.02-.11-.03-.21l-.01-.1H15.02v.1zm.16.48c0-.1.02-.15.03-.2l.02-.17h25.54l.02.12v.05l.03.2c.16 3-.6 5.43-2.24 7.2-1.9 2.06-4.98 3.23-8.9 3.39h-3.35c-3.93-.16-7.01-1.33-8.9-3.38-1.65-1.78-2.4-4.2-2.25-7.2zm12.57-3.78c.26 0 .45.11.57.34l.01.03.67-.3-.01-.04a1.28 1.28 0 0 0-1.23-.74c-.88 0-1.49.7-1.49 1.7 0 1.04.58 1.7 1.46 1.7.58 0 1-.25 1.25-.75l.01-.03-.6-.35-.03.03c-.17.28-.34.39-.6.39-.45 0-.75-.4-.75-.99 0-.6.29-.99.74-.99zm-2.82.05v-.7h-2.41v3.3h.72v-1.37h.98v-.7h-.98v-.53h1.69zm7.35-.7c.67 0 1.07.33 1.07.88 0 .26-.11.49-.3.63.26.14.42.4.42.7 0 .68-.45 1.08-1.2 1.08h-1.53v-3.3h1.54zm-.03.66h-.8v.55h.83c.22 0 .34-.1.34-.27 0-.13-.05-.28-.37-.28zm-.8 1.95h.83c.29 0 .44-.13.44-.38 0-.26-.14-.38-.44-.38h-.83v.76zM28 39.94c1.99 0 3.6-1.6 3.6-3.56a3.59 3.59 0 0 0-3.6-3.56c-2 0-3.61 1.6-3.61 3.56a3.59 3.59 0 0 0 3.6 3.56zm0-.21a3.4 3.4 0 0 1-1.9-.57 5.45 5.45 0 0 0 2.27-.56c.57-.34 1.17-.76 1.29-1.32.41-.2 1.21-.11 1.31.72A3.41 3.41 0 0 1 28 39.73zm-1.68-2.58c.17.1.37.18.6.2.48.07 1.13-.4 1.17-.92.65-.45 1.15-.04 1.3.32.3.7-.33 1.2-1.13 1.68-.63.37-1.71.54-2.42.54-.37-.3-.68-.69-.9-1.12h.09c.55 0 1.03-.26 1.3-.7zm-.54-1.7c0-.53.12-1 .24-1.5l.1-.35c.45-.3 1-.5 1.58-.56a.92.92 0 0 0 .1 1.36c-.1.07-.19.16-.26.28-.3.46-.34 1.25.35 1.75-.04.4-.57.78-.94.73-.78-.1-1.15-.82-1.17-1.7zm3.89 1.6a.8.8 0 0 0-.1-.38c-.17-.43-.8-.95-1.58-.42a1.08 1.08 0 0 1-.28-1.47c.4-.62 1.29-.37 2.11.08a3.46 3.46 0 0 1 1.55 1.83c-.03.36-.12.7-.26 1.02-.23-.7-.98-.81-1.44-.65zm.25-2.36c-.6-.33-1.37-.63-1.93-.4-.42-.26-.5-.91.04-1.26 1.79.02 3.25 1.4 3.35 3.15-.32-.6-.9-1.18-1.46-1.5zm-4.06-.91a42.06 42.06 0 0 1-.17.68c-.18.79-.18 1.98.47 2.56-.22.4-.63.62-1.13.62h-.18a3.33 3.33 0 0 1 1-3.85z"
            fill="#231F20"
        />
    </svg>
)

export default BarSvg