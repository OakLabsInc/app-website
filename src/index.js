const oak = require('oak')
const waitOn = require('wait-on');
let dns = require('dns')
let window = null

require('dotenv').config()

console.log("Versions: ",JSON.stringify(process.versions, null, 2))

function loadWindow () {
  
      let exceptions = ['localhost']

      let opts = {
        url: process.env.URL || 'https://zivelo.com/',
        background: process.env.COLOR || '#ffffff',
        display: parseInt(process.env.DISPLAY) || 0 ,
        ontop: Boolean(process.env.ONTOP) || false,
        size: process.env.SIZE || "1920x1080",
        sslExceptions:  exceptions,
        insecure: Boolean(process.env.INSECURE)  || false,
        kiosk: Boolean(process.env.KIOSK) || false,
        fullscreen: Boolean(process.env.FULLSCREEN) || false
      }
      if (opts.fullscreen) {
        delete opts.size
      }

      // let opts = process.env
      if (process.env.SSL_EXCEPTIONS) {
        opts.sslExceptions = process.env.SSL_EXCEPTIONS.split(';')
      }

      console.log("Options: ", opts)

      window = oak.load(opts)

}

// everything has to wait for the main ready event to fire
oak.on('ready', async () => {
  let waitFor = [process.env.URL];
  if (process.env.WAIT_ON) {
    waitFor = process.env.WAIT_ON.split(";")
  }
  console.log("waitFor: ", waitFor)
  let opts = {
    resources: waitFor
  }

  
  // Usage with async await
  try {
    await waitOn(opts);
    // once here, all resources are available
    loadWindow()
  } catch (err) {
    handleError(err);
  }
    
})

function handleError(err) {
  console.log('Error: ', err)
}
