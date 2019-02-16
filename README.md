<h2 align="center">Media Drive</h2>

<p align="center">
  <img src="public/img/logo.png">
</p>

<p align="center">
<a href="http://github.com/anu1601cs/media-manager"><img src="https://img.shields.io/npm/l/vue.svg" alt="License"></a>
<a href="http://github.com/anu1601cs/media-manager"><img src="https://travis-ci.org/lazyDrive/drive.svg?branch=master" alt="License"></a>
  <a href="http://github.com/anu1601cs/media-manager"><img src="https://badges.greenkeeper.io/lazyDrive/drive.svg" alt="License"></a>
</p>

<br>

<p align="center">
  <img  src="public/img/pre.gif">
</p>


### Directory layout



    .
    ├── docs                    # Documentation files (alternatively `doc`)
    ├── public                  # Public files
    ├── server                  # Server of application
    ├── src                     # Source files (alternatively `lib` or `app`)
    ├── test                    # Automated tests (alternatively `spec` or `tests`)
    ├── LICENSE
    └── README.md

## Vue CLI-3 Install


    # npm
    npm install -g @vue/cli


## Installation

    # Install imagemagick
    `sudo apt-get install imagemagick ghostscript poppler-utils`

    # In root and server run
    `npm install`

    # In server folder run
    `npm start`

    # In root run
    `npm run serve`

    # Done! Magic happens on port: `http://localhost:8080`

## To start a development server desktop app with electron:

if you use NPM:

`npm run electron:serve`

To build your app:

`npm run electron:build`

## Production

    # In root run
    `npm run build`

    It build fresh production package in server public folder for you. Then run your server in server folder using this command.
    `npm run drive

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018, Anurag Kumar [anu1601cs](http://github.com/anu1601cs/)
