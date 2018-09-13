const debug = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))
app.use(helmet());
app.use(logger());
app.use('/api/courses', courses);
app.use('/', home);

console.log('App Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Server Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('morgan enabled..');
}

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });
