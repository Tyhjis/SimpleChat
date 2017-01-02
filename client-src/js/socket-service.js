var socket = io();
/**
* Returns the public interface for the socket service.
*/
function socketService() {
  return {
    sendMessage: sendMessage,
    onReceive: onReceive,
    joinChannel: joinChannel,
    leaveChannel: leaveChannel,
    onChannelJoin: onChannelJoin,
    onChannelLeave: onChannelLeave,
    onRegister: onRegister,
    registerNickname: registerNickname
  };
}
/* Functions for user to send messages and register etc. */
// Client sends a message.
function sendMessage(msg) {
  socket.emit('message', msg);
}
// Client attempts to join a channel.
function joinChannel(channel) {
  socket.emit('channeljoin', channel);
}

function registerNickname(name) {
  socket.emit('register', name);
}

function leaveChannel(channel) {
  socket.emit('channelleave', channel);
}

// Event listeners
// When user has successfully joined a channel. Users on the channel are informed vial clientmessage event.
function onChannelJoin(callback) {
  socket.on('joinedchannel', callback);
}
// When user has successfully left a channel. Users on the channel are informed via clientmessage event.
function onChannelLeave(callback) {
  socket.on('leftchannel', callback);
}
// When user client successfully receives a message.
function onReceive(callback) {
  socket.on('clientmessage', callback);
}
// When user client successfully register a nickname.
function onRegister(callback) {
  socket.on('registered', callback);
}

module.exports = socketService;
