const server = require('./server-methods');
const config = require('./config');
const util = require('./util');

server.route({
    path: '/{account}/{repo}/badge',
    method: 'GET',
    handler: (request, reply) => {
        const { account, repo } = request.params;
        const { errorBadge, returnType } = config.badge;
        const color = util.getColor(request.query.color);
        server.methods.getLicense(account, repo, (err,result) => {
            if(err){
                reply.file(errorBadge).type(returnType);
            }
            else{
                server.methods.getBadge(result.license, color.colorB,(err, result) =>{
                    if(err){
                        reply.file(errorBadge).type(returnType);
                    }
                    else{
                        reply(result).type(returnType);
                    }
                })
            }
        })
    }
});

server.route({
    path: '/{account}/{repo}/license',
    method: 'GET',
    handler: (request, reply) =>{
        const { account, repo } = request.params;
        server.methods.getLicense(account, repo, (err,result) =>{
            if(err){
                reply.redirect('/');
            }else{
                reply.redirect(result.url);
            }
        })
    }
})

server.route({
    path: '/{path*}',
    method: 'GET',
    handler: (request, reply) =>{
        reply("Hello World");
    }
})


module.exports = server;
