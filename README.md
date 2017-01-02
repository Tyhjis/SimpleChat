# SimpleChat

A simple NodeJS chat software using [ExpressJS](http://expressjs.com/), [Socket.io](http://socket.io/) and [Angular](https://angularjs.org/).

## Build pipeline

Gulp is used for building client side components.

Technologies also include [Browserify](http://browserify.org/) with [Watchify](https://github.com/substack/watchify) plugin. [SASS](http://sass-lang.com/) is used for styling.

To build the software. Run `npm install` and then `gulp`. This builds both `js` and `scss` files. Minifying and uglifying are not done at this point.

## Project structure

### Server side

Server side source files are located in the project root and in directories `protocol`. Package entry point is `server.js`. Main dependencies in server logic are [ExpressJS](http://expressjs.com/) and [Socket.io](http://socket.io/).

### Client side

The main framework included in client side logic is [Angular](https://angularjs.org/). [JQuery](https://jquery.com/) and [Bootstrap](http://getbootstrap.com/) are also used, but only via a CDN.
