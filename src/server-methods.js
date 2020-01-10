const util = require("./util");
const config = require("./config");
const getServer = async () => {
    const server = await require("./server")();
    server.method("getLicense", util.getLicense, config.serverMethod);
    server.method("getBadge", util.getBadge, config.serverMethod);
    return server;
}

module.exports = getServer;