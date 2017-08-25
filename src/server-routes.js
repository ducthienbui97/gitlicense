const server = require('./server-methods');
const config = require('./config');
const util = require('./util');

server.route({
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
        reply.view('index');
    }
})

server.route({
    path: '/{path*}',
    method: 'GET',
    handler: (request, reply) => {
        reply.redirect('/');
    }
})

server.route({
    path: '/assets/{path*}',
    method: 'GET',
    handler: {
        directory: {
            path: config.staticFiles,
            listing: false,
            index: false
        }
    }
})

server.route({
    path: '/badge/{account}/{repo}',
    method: 'GET',
    handler: (request, reply) => {
        const { account, repo } = request.params;
        const { errorBadge, returnType } = config.badge;
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
                })
            }
        })
    }
});

server.route({
    path: '/license/{account}/{repo}',
    method: 'GET',
    handler: (request, reply) => {
        const { account, repo } = request.params;
        server.methods.getLicense(account, repo, (err, result) => {
            if (err) {
                reply.redirect('/');
            } else {
                reply.redirect(result.url);
            }
        })
    }
})

server.route({
    path: '/repository/{account}/{repo}',
    method: 'GET',
    handler: (request, reply) => {
        const { account, repo } = request.params;
        reply.view('template', { account, repo });
    }
})
module.exports = server;