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

### How to used

You can test this software in <http://simplechat5000.herokuapp.com/>.

First you choose nickname. After that, you have to join a channel. If the channel does not exist, it will be added. There are no lists of channels, so you have to tell the channel name for everyone you'd like to talk to.

### Ideas for improvement

The following list contains ideas for improvement. Can also be used as an unofficial TODO-list.

* There can now be multiple users with the same nickname. Might be a good idea to have restriction on this.
* The main UI needs overall improvement. Perhaps change Angular to something else even.
* List all existing channels on server. At this moment channels are "hidden". (Basically the same as in IRC).
* List all connected users (and their channels).
* Emit a message to channels when a user disconnects.
* List all users by channel.
