/**
* Helper function for constructing messages.
* @constructor
* @param {string} text - The actual text message.
* @param {string} channel - The channel name where the message is sent.
* @param {string} user - The user nickname who is sending the message. User has to be found in the list of users.
*/
function Message(text, channel, user) {
  return {
    msg: text,
    channel: channel,
    user: user
  };
}

module.exports.Message = Message;
