import { generateClasses } from '@formkit/themes'

const config = {
    
    theme:'genesis',
    icons: { 
        userIcon:' <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><g fill="var(--color-morado-general)"><circle cx="12" cy="6" r="4"/><path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z"/></g></svg>',
        segurity: '<svg class="pwdIcon" xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="var(--color-morado-general)" d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"/></svg>',
        eyeOpen: '<svg  class="eyeOpenIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="var(--color-morado-general)" d="M247.31 124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57 61.26 162.88 48 128 48S61.43 61.26 36.34 86.35C17.51 105.18 9 124 8.69 124.76a8 8 0 0 0 0 6.5c.35.79 8.82 19.57 27.65 38.4C61.43 194.74 93.12 208 128 208s66.57-13.26 91.66-38.34c18.83-18.83 27.3-37.61 27.65-38.4a8 8 0 0 0 0-6.5ZM128 192c-30.78 0-57.67-11.19-79.93-33.25A133.47 133.47 0 0 1 25 128a133.33 133.33 0 0 1 23.07-30.75C70.33 75.19 97.22 64 128 64s57.67 11.19 79.93 33.25A133.46 133.46 0 0 1 231.05 128c-7.21 13.46-38.62 64-103.05 64Zm0-112a48 48 0 1 0 48 48a48.05 48.05 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32a32 32 0 0 1-32 32Z"/></svg>',
        eyeClose:'<svg  class="eyeCloseIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="var(--color-morado-general)" d="M228 175a8 8 0 0 1-10.92-3l-19-33.2A123.23 123.23 0 0 1 162 155.46l5.87 35.22a8 8 0 0 1-6.58 9.21a8.4 8.4 0 0 1-1.29.11a8 8 0 0 1-7.88-6.69l-5.77-34.58a133.06 133.06 0 0 1-36.68 0l-5.77 34.58A8 8 0 0 1 96 200a8.4 8.4 0 0 1-1.32-.11a8 8 0 0 1-6.58-9.21l5.9-35.22a123.23 123.23 0 0 1-36.06-16.69L39 172a8 8 0 1 1-13.94-8l20-35a153.47 153.47 0 0 1-19.3-20a8 8 0 1 1 12.46-10c16.6 20.54 45.64 45 89.78 45s73.18-24.49 89.78-45a8 8 0 1 1 12.44 10a153.47 153.47 0 0 1-19.3 20l20 35a8 8 0 0 1-2.92 11Z"/></svg>',
        checkkIcon :'<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="var(--color-morado-general)" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"/></svg>',
        emailIcon :'<svg class="emailIcon" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.3em" viewBox="0 0 432 384"><path fill="var(--color-morado-general)" d="M384 21q18 0 30.5 12.5T427 64v256q0 18-12.5 30.5T384 363H43q-18 0-30.5-12.5T0 320V64q0-18 12.5-30.5T43 21h341zm0 86V64L213 171L43 64v43l170 106z"/></svg>',
        phoneIcon :'<svg class="phoneIcon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="var(--color-morado-general)" d="M4.05 21q-.45 0-.75-.3t-.3-.75V15.9q0-.325.225-.588t.575-.362l3.45-.7q.35-.05.713.063t.587.337L10.9 17q.95-.55 1.8-1.213t1.625-1.437q.825-.8 1.513-1.663t1.187-1.787L14.6 8.45q-.2-.2-.275-.475T14.3 7.3l.65-3.5q.05-.325.325-.563T15.9 3h4.05q.45 0 .75.3t.3.75q0 3.125-1.363 6.175t-3.862 5.55q-2.5 2.5-5.55 3.863T4.05 21Z"/></svg>',
    }
}

export default config
