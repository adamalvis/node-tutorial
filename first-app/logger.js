const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
  log(message) {
    console.log('inside func: ', message);
    this.emit('messageLogged', { message });
  }
}

module.exports = Logger;
