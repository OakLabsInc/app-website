const oak = require('oak')
const waitOn = require('wait-on');
let dns = require('dns')

function loadWindow () {
  dns.lookupService('8.8.8.8', 53, function (err, hostname, service) {
    if (err !== null) {
      loadWindow()
    } else {
      let exceptions = ['localhost']
      if (process.env.SSL_EXCEPTIONS) {
        exceptions = process.env.SSL_EXCEPTIONS.split(';')
      }
   
      oak.load({
        url: process.env.REMOTE_URL || 'https://zivelo.com/',
        size: process.env.WINDOW_SIZE || '1080x1920',
        background: process.env.BACKGROUND_COLOR || '#ffffff',
        ontop: process.env.WINDOW_ONTOP='true'?true:false || true,
        sslExceptions:  exceptions,
        insecure: process.env.INSECURE='true'?true:false || false
      })
    }
  })
}

// everything has to wait for the main ready event to fire
oak.on('ready', () => {
  var opts = {
    resources: [process.env.REMOTE_URL]
  }
  waitOn(opts, function (err) {
    if (err) { return handleError(err); }
    // once here, all resources are available
    loadWindow()
  });
  
})
