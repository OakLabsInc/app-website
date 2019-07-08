# app-website

App for displaying a simple website

## Install

Please use [`nvm`](https://github.com/creationix/nvm#install-script) to install node.

``` bash
# use the node version for oak
nvm use $(cat .nvmrc)

# install dependencies
npm install

# rebuilds native modules for oak
./node_modules/.bin/oak-rebuild .
```

## Running

``` bash
npm start
```

## Passing Environmental Variables

example in the `.env` file

``` text
REMOTE_URL="https://www.google.com"
BACKGROUND_COLOR="#000000"
WINDOW_SIZE="1920x1080"
WINDOW_ONTOP="false"
```

### Passing to the install

``` json
{
  "services": [
    {
      "image": "index.docker.io/oaklabs/app-website:1.0.9",
      "username": "{{dockerUsername}}",
      "password": "{{dockerPassword}}",
      "environment": {
        "REMOTE_URL": "https://oak-signage.firebaseapp.com/preview.html?apikey=K6z0KH8UeYgSgeRVuVWlnzFBfD32&galleryname=coffee_shop",
        "NODE_ENV": "production"
      }
    }
  ]
}
```

### Development Environment

In order to test this locally you will need to create a `.env` file in the root of the project. Put the following example in it and run the project with `nmp run dev`

```
REMOTE_URL="https://zivelo.com"
BACKGROUND_COLOR="#000000"
WINDOW_SIZE="1920x1080"
WINDOW_ONTOP="0"
SSL_EXCEPTIONS="localhost;*.google.com"
INSECURE="1"
WAIT_ON="https://www.fast.com;https://www.google.com"
```

The `WAIT_ON` variable tells the app to wait for those assets to be available before starting the electron window. The rest are explained in the `oak` documentation. [https://github.com/OakLabsInc/oak](https://github.com/OakLabsInc/oak)

Note that `REMOTE_URL` is the only required environmental variable.
