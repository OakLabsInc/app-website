const oak = require('oak')

// store the window closure, if needed the window can be destroyed later
let window = null

function loadWindow () {

  window = oak.load({
    url: process.env.REMOTE_URL || 'https://zivelo.com/',
    size: '1080x1920',
    background: '#ffffff',
    ontop: false,
    sslExceptions: ['localhost']
  })
  // the client side has fired window.oak.ready()
  .on('ready', function () {
    window.send('app.ready',{})
  })
 
}

// everything has to wait for the main ready event to fire
oak.on('ready', () => {
  loadWindow()
})
