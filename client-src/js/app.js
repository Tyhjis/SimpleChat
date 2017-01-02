var angular = require('angular');
var chatCtrl = require('./chat-controller.js');
var socketService = require('./socket-service.js');

var ChatApp = angular.module('ChatApp', []);
ChatApp.factory('socketService', socketService);
ChatApp.controller('ChatController', ['$scope', 'socketService', chatCtrl]);

$(function() {
  var messagebox = $('#message-box')[0];
  var scrolledDown = false;
  var keepDown = true;
  var lastScrollpos = 0;
  messagebox.addEventListener('scroll', function(e) {
    if(lastScrollpos > this.scrollTop) {
      keepDown = false;
    } else {
      keepDown = true;
    }
    lastScrollpos = this.scrollTop;
  }.bind(messagebox));

  var mutationObserver = new MutationObserver(function(mutations) {
    if(keepDown) {
      messagebox.scrollTop = messagebox.scrollHeight;
    }
  });
  var config = {childList: true};
  mutationObserver.observe(messagebox, config);
});
