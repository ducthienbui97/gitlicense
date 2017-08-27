const hapi = require("hapi");
const path = require("path");
const config = require("./config");
const server = new hapi.Server(config.server);
server.connection(config.connection);

server.register([
        require("inert"),
        require("vision")
    ],
    (err) => {
        if (err) {
            throw err;
        }
        server.views({
            engines: {
                html: require("handlebars")
            },
            path: path.join(__dirname, "../public/pages"),
            layoutPath: path.join(__dirname, "../public/layout"),
            layout: "default"
        });
    });

module.exports = server;