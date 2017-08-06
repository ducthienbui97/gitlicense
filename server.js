const hapi = require('hapi');
const axios = require('axios');
const path = require('path');
const server = new hapi.Server();

server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8080,
    routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
});
server.register(require('inert'), (err) => {
    if(err)
        throw err;
})
server.register(require('vision'), (err) => {
    if(err)
        throw err;
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});
server.route({
    path: '/{account}/{repo}/badge',
    method: 'GET',
    handler: function(request, reply) {
        axios.get('https://api.github.com/repos/' + request.params.account + '/'+ request.params.repo + '/license',{
            headers: {'Accept':'application/vnd.github.drax-preview+json'}
        })
        .then((res) =>{
            axios.get('https://img.shields.io/badge/License-' + res.data.license.spdx_id + '-brightgreen.svg')
            .then((res)=>{
                reply(res.data).type('image/svg+xml')
            })
            .catch((err)=>{
                reply.file('problem-unknown-red.svg').type('image/svg+xml');
            });
        })
        .catch((err) => {
            reply.file('problem-unknown-red.svg').type('image/svg+xml');
        });
    }
});

server.start(function() {
    console.log('Server started: ' + server.info.uri);
});
