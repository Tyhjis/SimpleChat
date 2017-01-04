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

  describe('registering', () => {
    it('should receive chosen nickname', () => {
      let client = io.connect('http://localhost:3000', opts);

      client.once('connect', () => {
        client.once('registered', (msg) => {
          expect(msg).toBe('tester');
        });
        client.emit('register', 'tester');
      });
    });
  });

  describe('sending message', () => {
    var client;
    beforeEach((done) => {
      client = io.connect('http://localhost:3000', opts);
      client.once('connect', () => {
        client.emit('register', 'tester');
        client.emit('channeljoin', 'testch');
      });
      done();
    });

    describe('correctly', () => {
      it('should receive the message with channel and username', () => {
        client.once('connect', () => {
          client.once('clientmessage', (msg) => {
            expect(msg).toBe({ channel:'testch', user:'tester', msg:'test message' });
          });

          client.emit('message', {msg: 'test message', channel: 'testch'});
        });
      });
    });

    describe('incorrectly', () => {
      it('should receive an error message', () => {
        client.once('connect', () => {
          client.once('messageerror', (msg) => {
            expect(msg).toBe('An error occurred in sending message.');
          });
          client.emit('message', {msg: 'nopes'});
        });
      });
    });
  });
});
