# app-website

App for displaying a simple website

> Sample. Not to be used for production deployments

## Install

Please use [`nvm`](https://github.com/creationix/nvm#install-script) to install node.

``` bash
# use the node version for oak
nvm use $(cat .nvmrc)

# install dependencies
npm install

# rebuilds native modules for oak
npm run rebuild
```

## Running for development

``` bash
npm run dev
```

### Passing to the install

``` json
{
  "services": [
    {
      "image": "index.docker.io/oaklabs/app-website:latest",
      "username": "{{dockerUsername}}",
      "password": "{{dockerPassword}}",
      "environment": {
        "REMOTE_URL": "http://static.oak.host/signage/index.html",
        "NODE_ENV": "production"
      }
    }
  ]
}
```

### Development Environment

In order to test this locally you will need to create a `.env` file in the root of the project. Put the following example in it and run the project with `nmp run dev`

``` text
REMOTE_URL="https://zivelo.com"
BACKGROUND_COLOR="#000000"
WINDOW_SIZE="1920x1080"
WINDOW_ONTOP="0"
FULLSCREEN="1"
DISPLAY_ID="0"
SSL_EXCEPTIONS="localhost;*.google.com"
INSECURE="1"
WAIT_ON="https://www.fast.com;https://www.google.com"
```

`REMOTE_URL` (default: https://www.zivelo.com) The url of the site to be displayed.

`WAIT_ON` (default: REMOTE_URL) Tells the app to wait for those assets to be available before starting the electron window.

`DISPLAY_ID` (default: 0) Designates the display this window should be assigned to.

`FULLSCREEN` (default: false) Overrides the `SIZE` option and makes the widow the full desktop. Beware that multiple displays extend the fullscreen to the entire set of displays that share the entire desktop.

`WINDOW_PERCENT` (default: 1) Sets the width of the window for a given display to this percentage. expects a value like .5 for 50%

`WINDOW_X` (default: 0) The x position of the window.

`WINDOW_Y` (default: 0) The y position of the window.

`BACKGROUND_COLOR` (default: #ffffff) An html hex value for the window background color.

`WINDOW_ONTOP` (default: false) Is the window always the upper most window.

`WINDOW_INSECURE` (default: false) Allow insecure connections.

`SSL_EXCEPTIONS` (default: localhost) Bypass SSL security for specific hosts. This uses a host pattern. Example: `"*.mysite.com"` These should be delimited by semi-colons. `"localhost;*.google.com"`

`REMOVE_SCROLLBARS` (default: null) Set to "1" to inject the css to remove the scrollbars from Electron window

The rest are explained in the `oak` documentation. [https://github.com/OakLabsInc/oak#oakloadoptions-callback](https://github.com/OakLabsInc/oak#oakloadoptions-callback)
