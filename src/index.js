const oak = require('oak')

let dns = require('dns')

function loadWindow () {
  dns.lookupService('8.8.8.8', 53, function (err, hostname, service) {
    if (err !== null) {
      loadWindow()
    } else {
      oak.load({
        url: process.env.REMOTE_URL || 'https://zivelo.com/',
        size: process.env.WINDOW_SIZE || '1080x1920',
        background: process.env.BACKGROUND_COLOR || '#ffffff',
        ontop: process.env.WINDOW_ONTOP='true'?true:false || true,
        sslExceptions: ['localhost']
      })
    }
  })
}

// everything has to wait for the main ready event to fire
oak.on('ready', () => {
  loadWindow()
})
