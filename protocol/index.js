'use strict';
var _io;
var Message = require('./util.js').Message;

/*
* Registered nicknames are kept here on the server. This might become a memory problem.
* In this small and simple software, this is enough. Holding state server side is not the best practice.
* Unique socket.id is used as the key to this js object. Nickname is the value.
*/
var registeredNicknames = {};

/**
* Module entry point. The only piece of code accessed outside.
*/
function configureProtocol(io) {
  _io = io;
  _io.on('connect', onConnect);
}
/**
* Define socket event listeners here. At this moment the practice is to give closures to event listeners. Pass socket to closure.
*/
function onConnect(socket) {
  socket.on('message', onMessage(socket));
  socket.on('channeljoin', onChannelJoin(socket));
  socket.on('channelleave', onChannelLeave(socket));
  socket.on('register', onRegister(socket));
  socket.on('disconnect', onDisconnect(socket));
}

function onMessage(socket) {
  return function(msg) {
    if(registeredNicknames[socket.id] != null) {
      try {
        let temp = new Message(msg.msg.trim(), msg.channel, registeredNicknames[socket.id]);
        _io.to(msg.channel).emit('clientmessage', temp);
      } catch(error) {
        _io.to(socket.id).emit('messageerror', 'An error occurred in sending message.');
      }
    }
  }
}

function onChannelJoin(socket) {
  return function(channel) {
    if(registeredNicknames[socket.id] != null) {
      try {
        socket.join(channel.name);
        _io.to(socket.id).emit('joinedchannel', channel);
        informChannel(socket, 'has joined the channel', channel);
      } catch(error) {
        //TODO: Handle error.
      }
    }
  }
}

function onChannelLeave(socket) {
  return function(channel) {
    if(registeredNicknames[socket.id] != null) {
      try {
        socket.leave(channel.name);
        _io.to(socket.id).emit('leftchannel', channel);
        informChannel(socket, 'has left the channel', channel);
      } catch(error) {
        //TODO: Handle error.
      }
    }
  }
}

function informChannel(socket, text, channel) {
  let username = registeredNicknames[socket.id];
  let message = new Message(text, channel.name, username);
  _io.to(channel.name).emit('clientmessage', message);
}

function onDisconnect(socket) {
  return function() {
    try {
      // TODO: Inform every channel that the user has disconnected.
      delete registeredNicknames[socket.id];
    } catch(error) {
      // TODO: Handle error.
    }
  }
}

function onRegister(socket) {
  return function(nickname) {
    try {
      var nick = nickname.trim();
      registeredNicknames[socket.id] = nick;
      _io.to(socket.id).emit('registered', nick);
    } catch(error) {}
  }
}
module.exports = configureProtocol;
