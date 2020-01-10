const hapi = require("@hapi/hapi");
const path = require("path");
const config = require("./config");

const getServer = async () => {
    const server = new hapi.Server(config.server);

    await server.register([
        require("@hapi/vision"), 
        require("inert")
    ]);
    server.views({
        engines: {
            html: require("handlebars")
        },
        path: path.join(__dirname, "../public/pages"),
        layoutPath: path.join(__dirname, "../public/layout"),
        layout: "default"
    })
    return server;
}
module.exports = getServer;