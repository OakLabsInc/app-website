const oak = require('oak')

let dns = require('dns')

function loadWindow () {
  dns.lookupService('8.8.8.8', 53, function (err, hostname, service) {
    if (err !== null) {
      loadWindow()
    } else {
      oak.load({
        url: process.env.REMOTE_URL || 'https://zivelo.com/',
        size: '1080x1920',
        background: '#ffffff',
        ontop: false,
        sslExceptions: ['localhost']
      })
    }
  })
}

// everything has to wait for the main ready event to fire
oak.on('ready', () => {
  loadWindow()
})
