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
      "image": "index.docker.io/oaklabs/app-website:1.0.2",
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