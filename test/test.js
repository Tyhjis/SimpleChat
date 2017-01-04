var expect = require('expect');
var io = require('socket.io-client');

describe('Chat client', () => {
  var server;
  var opts = {
    transports: ['websocket'],
    'force new connection': true
  };

  beforeEach((done) => {
    server = require('../server.js');
    done();
  });

  describe('nickname choose', () => {
    it('should receive chosen nickname', () => {
      var client = io.connect('http://localhost:3000', opts);

      client.once('connect', () => {
        client.once('registered', (msg) => {
          expect(msg).toBe('tester');
        });
        client.emit('register', 'tester');
      });
    });
  });
});
