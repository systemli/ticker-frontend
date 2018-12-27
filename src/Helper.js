export function replaceMagic (text) {
  return (text
    .replace(/(https?:\/\/([^\s]+))/g, '<a href="$1" target="_blank">$2</a>')
    .replace(/#(\S+)/g, '<a target="_blank" rel="noopener noreferrer" href="https://twitter.com/search?q=%23$1">#$1</a>')
    .replace(/ @(\S+)/g, ' <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/$1">@$1</a>')
    .replace(/(\w+@\w+.\w+)/g, '<a href="mailto:$1">$1</a>')
    .replace(/(?:\r\n|\r|\n)/g, '<br/>'))
}

export function isMobile () {
  let w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0],
    width = w.innerWidth || documentElement.clientWidth || body.clientWidth

  // the mobile breakpoint
  return width < 768
}
