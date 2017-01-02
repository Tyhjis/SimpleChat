function chatController($scope, socketService) {
  $scope.channels = {};
  $scope.channelSelected = '';
  $scope.messages = [];
  $scope.registerednick = null;

  socketService.onReceive(function(msg) {
    $scope.channels[msg.channel].push(msg);
    $scope.$apply();
  });

  socketService.onChannelJoin(function(channel) {
    $scope.channels[channel.name] = [];
    changeChannel(channel.name);
    $scope.channelName = '';
    $scope.$apply();
  });

  socketService.onChannelLeave(function(channel) {
    delete $scope.channels[channel.name];
    $scope.messages = [];
    changeChannel('');
    $scope.$apply();
  });

  socketService.onRegister(function(nickname) {
    $scope.registerednick = nickname;
    $scope.$apply();
  });

  $scope.send = function(message) {
    socketService.sendMessage({ msg: message, channel: $scope.channelSelected });
    $scope.newMessage = '';
  };

  $scope.channel = function(name) {
    socketService.joinChannel({name: name});
  };

  $scope.partChannel = function(name) {
    socketService.leaveChannel({name: name});
  };

  $scope.selectChannel = function(name) {
    changeChannel(name);
  }

  function changeChannel(name) {
    $scope.channelSelected = name;
    $scope.messages = $scope.channels[name];
  }

  $scope.register = function(name) {
    socketService.registerNickname(name);
    $scope.newNickname = '';
  }
}

module.exports = chatController;
