const server = require('./server');
const util = require('./util');
const config = require('./config');
server.method('getLicense', util.getLicense, config.serverMethod);
server.method('getBadge', util.getBadge, config.serverMethod);

module.exports = server;
