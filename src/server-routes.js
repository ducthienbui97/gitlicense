const server = require("./server-methods");
const config = require("./config");
const util = require("./util");

server.route({
    path: "/",
    method: "GET",
    handler: (request, reply) => {
        const {
            host
        } = request.info;
        const protocol = request.headers["x-forwarded-proto"] || request.connection.info.protocol;
        reply.view("index", {
            host,
            protocol
        });
    }
});

server.route({
    path: "/{path*}",
    method: "GET",
    handler: (request, reply) => {
        reply.redirect("/");
    }
});

server.route({
    path: "/assets/{path*}",
    method: "GET",
    handler: {
        directory: {
            path: config.staticFiles,
            listing: false,
            index: false
        }
    }
});

server.route({
    path: "/badge/{account}/{repo}",
    method: "GET",
    handler: (request, reply) => {
        const {
            account,
            repo
        } = request.params;
        const {
            errorBadge,
            returnType
        } = config.badge;
        const color = util.getColor(request.query.color);
        server.methods.getLicense(account, repo, (err, result) => {
            if (err) {
                reply.file(errorBadge).type(returnType);
            } else {
                server.methods.getBadge(result.license, color.colorB, (err, result) => {
                    if (err) {
                        reply.file(errorBadge).type(returnType);
                    } else {
                        reply(result).type(returnType);
                    }
                });
            }
        });
    }
});

server.route({
    path: "/license/{account}/{repo}",
    method: "GET",
    handler: (request, reply) => {
        const {
            account,
            repo
        } = request.params;
        server.methods.getLicense(account, repo, (err, result) => {
            if (err) {
                reply.redirect("/");
            } else {
                reply.redirect(result.url);
            }
        });
    }
});

server.route({
    path: "/repository/{account}/{repo}/{color?}",
    method: "GET",
    handler: (request, reply) => {
        const {
            account,
            repo,
            color
        } = request.params;
        const {
            host
        } = request.info;

        const defaultColor = util.getColorName(color);
        const protocol = request.headers["x-forwarded-proto"] || request.connection.info.protocol;
        server.methods.getLicense(account, repo, (err, result) => {
            if (err) {
                reply.redirect("/");
            } else {
                reply.view("template", {
                    account,
                    repo,
                    host,
                    protocol,
                    color: defaultColor,
                    colors: Object.keys(config.badge.colors)
                      .filter(name => ['grey', 'lightgrey'].indexOf(name) === -1)
                      .map(name => {
                      return {name, colorHex: config.badge.colors[name]['colorB']}
                    })
                });
            }
        });
    }
});

module.exports = server;
