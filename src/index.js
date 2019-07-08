const oak = require('oak')
const waitOn = require('wait-on');
let dns = require('dns')

require('dotenv').config()

function loadWindow () {
  
      let exceptions = ['localhost']
      if (process.env.SSL_EXCEPTIONS) {
        exceptions = process.env.SSL_EXCEPTIONS.split(';')
      }
      console.log("sslExceptions: ", exceptions)
      oak.load({
        url: process.env.REMOTE_URL || 'https://zivelo.com/',
        size: process.env.WINDOW_SIZE || '1080x1920',
        background: process.env.BACKGROUND_COLOR || '#ffffff',
        ontop: !!+process.env.WINDOW_ONTOP,
        sslExceptions:  exceptions,
        insecure: !!+process.env.INSECURE
      })

}

// everything has to wait for the main ready event to fire
oak.on('ready', () => {
  let waitFor = [process.env.REMOTE_URL];
  if (process.env.WAIT_ON) {
    waitFor = process.env.WAIT_ON.split(";")
  }
  console.log("waitFor: ", waitFor)
  let opts = {
    resources: waitFor
  }
  waitOn(opts, function (err) {
    if (err) { return handleError(err); }
    // once here, all resources are available
    loadWindow()
  });
  
})
