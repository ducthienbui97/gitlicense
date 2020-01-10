
const getServer = require("./server-routes");
getServer().then((server) => server.start().then(function (err) {
    console.log("Server started: " + server.info.uri);
}).catch(err => console.log(err))).catch(err => console.log(err));

module.exports = getServer;