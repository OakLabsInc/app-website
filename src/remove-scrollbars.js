var body = document.getElementsByTagName('body')[0]

function addStyle (styleString) {
  const style = document.createElement('style')
  style.textContent = styleString
  body.prepend(style)
}

addStyle(`

html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px !important;
}


`)

var metaTag = document.createElement('meta')
metaTag.setAttribute('http-equiv', 'Content-Security-Policy')
metaTag.setAttribute('content', `style-src 'self'`)
