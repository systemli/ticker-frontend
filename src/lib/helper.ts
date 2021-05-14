import { breakpoints } from './theme'

// FIXME: Not sure if checking the width once and using it to decide upon
// what markup to render actually is the best solution here.
export const isMobile = () => {
    const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth
    return width < breakpoints.mobile
}

export const apiUrl =
    process.env.REACT_APP_API_URL || 'http://localhost:8080/v1'

// FIXME: Might be better to use a library like validator.js
// to catch more cases.
export const replaceMagic = (text: string) => {
    return text
        .replace(
            /(https?:\/\/([a-zA-Z0-9._\-/]+))/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
        )
        .replace(
            /#(\S+)/g,
            '<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23$1">#$1</a>'
        )
        .replace(
            / @(\S+)/g,
            ' <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/$1">@$1</a>'
        )
        .replace(
            /([a-zA-Z0-9_\-.]+@[a-zA-Z0-9_-]+.[a-zA-Z]+)/g,
            '<a href="mailto:$1">$1</a>'
        )
        .replace(/(?:\r\n|\r|\n)/g, '<br/>')
}
