const config = require("./config");
const util = require("./util");

const getServer = async () => {
    const server = await require("./server-methods")();
    server.route({
        path: "/",
        method: "GET",
        handler: (request, reply) => {
            const {
                host
            } = request.info;
            const protocol = request.headers["x-forwarded-proto"] || request.server.info.protocol;
            return reply.view("index", {
                host,
                protocol
            });
        }
    });
    
    server.route({
        path: "/{path*}",
        method: "GET",
        handler: (request, reply) => {
            return reply.redirect("/");
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
        handler: async (request, reply) => {
            const {
                account,
                repo
            } = request.params;
            const {
                errorBadge,
                returnType
            } = config.badge;
            const color = util.getColor(request.query.color);
            try {
                let result = await server.methods.getLicense(account, repo)
                let badge = await server.methods.getBadge(result.license, color.colorB)
                return reply.response(badge).type(returnType);
            } catch(err) {
                return reply.file(errorBadge).type(returnType);
            }
        }
    });
    
    server.route({
        path: "/license/{account}/{repo}",
        method: "GET",
        handler: async (request, reply) => {
            const {
                account,
                repo
            } = request.params;
            try {
                let result = await server.methods.getLicense(account, repo);
                return reply.redirect(result.url);
            } catch(err) {
                return reply.redirect("/");
            }
        }
    });
    
    server.route({
        path: "/repository/{account}/{repo}",
        method: "GET",
        handler: async (request, reply) => {
            const {
                account,
                repo
            } = request.params;
            const {
                host
            } = request.info;
            const protocol = request.headers["x-forwarded-proto"] || request.server.info.protocol;
            try {
                await server.methods.getLicense(account, repo);
                return reply.view("template", {
                    account,
                    repo,
                    host,
                    protocol
                });
            } catch(err) {
                return reply.redirect("/");
            }
        }
    });
    return server;
}

module.exports = getServer;