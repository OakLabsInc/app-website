const oak = require('oak')
const { join } = require('path')
const waitOn = require('wait-on');
let dns = require('dns')
let window = null

require('dotenv').config()

console.log("Versions: ",JSON.stringify(process.versions, null, 2))

function loadWindow () {
  
  let exceptions = ['localhost']
  let displays = oak.getDisplays()
  let display = parseInt(process.env.DISPLAY_ID) || 0
  let fullscreen = Boolean(process.env.FULLSCREEN) || false
  let url = process.env.REMOTE_URL || 'http://static.oak.host/signage/index.html'
  let width = displays[display].workArea.width
  let height = displays[display].workArea.height
  let percent = process.env.WINDOW_PERCENT || 1
  let size = (width * percent)  + "x" + height
  let x = width -  (width * percent)
  if( process.env.WINDOW_X ) {
    x = parseInt(process.env.WINDOW_X)
  }
  let y = displays[display].workArea.y
  if( process.env.WINDOW_Y ) {
    y = parseInt(process.env.WINDOW_Y)
  }
  let background = process.env.BACKGROUND_COLOR || '#ffffff'
  let ontop = process.env.WINDOW_ONTOP || false
  let insecure = Boolean(process.env.WINDOW_INSECURE)  || false


  console.log("Displays: ",JSON.stringify(displays))

  let scripts = [
    join(__dirname, 'remove-scrollbars.js'),
  ]

  let opts = {
    url,
    background,
    display,
    ontop,
    size: size,
    x: x,
    y: y,
    sslExceptions:  exceptions,
    insecure,
    fullscreen
  }
  if (opts.fullscreen) {
    delete opts.size
  }

  // let opts = process.env
  if (process.env.SSL_EXCEPTIONS) {
    opts.sslExceptions = process.env.SSL_EXCEPTIONS.split(';')
  }

  if (process.env.REMOVE_SCROLLBARS) {
    opts.scripts = scripts
  }

  console.log("Options: ", opts)

  oak.load(opts)

}

// everything has to wait for the main ready event to fire
oak.on('ready', async () => {
  let waitFor = [process.env.REMOTE_URL];
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
