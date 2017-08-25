const server = require('./server-routes');
const config = require('./config');
server.start(function(err) {
    if (err)
        console.log(err);
    else
        console.log('Server started: ' + server.info.uri);
});

module.exports = server;