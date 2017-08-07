const hapi = require('hapi');
const axios = require('axios');
const path = require('path');
const base64 = require('base-64');

const server = new hapi.Server({
    cache : [{
            name      : 'diskCache',
            engine    : require('catbox-disk'),
            cachePath: path.join(__dirname,'cache'),
            cleanEvery: 86400000,
            partition : 'cache'
    }]
});

server.connection({
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    router: {
        isCaseSensitive: false,
        stripTrailingSlash: true
    },
    routes: {cors: true}
});

server.register(require('inert'), (err) => {
    if(err)
        throw err;
});

const getLicense = (account, repo, next) =>{
    const githubApiUrl = 'https://api.github.com/repos/' + account + '/'+ repo;
    axios.get(githubApiUrl + '/contents/.gitlicense')
    .then((res) => {
        content = JSON.parse(base64.decode(res.data.content));
        for(let license in content){
            const url = content[license];
            next(null,{
                license: license,
                url: url
                });
            }
        })
    .catch((err) => {
        axios.get(githubApiUrl + '/license',{
            headers: {'Accept':'application/vnd.github.drax-preview+json'}
        })
        .then((res) =>{
            next(null,{
                license: res.data.license.spdx_id,
                url: res.data.html_url
            });
        })
        .catch((err) => {
            next(err,null);
        });
    })
}

server.method('getLicense', getLicense,{
    cache:{
        cache:'diskCache',
        expiresIn: 86400000,
        generateTimeout: false
    }
});

const getBadge = (license, color, next) =>{
    const shieldsUrl = "https://img.shields.io/badge/license-"+ license.split('-').join('--') + "-" + color + ".svg";
    axios.get(shieldsUrl)
    .then((res) =>{
        next(null,res.data);
    })
    .catch((err) =>{
        next(err,null);
    })
}

server.method('getBadge', getBadge,{
    cache:{
        cache:'diskCache',
        expiresIn: 86400000,
        generateTimeout: false
    }
});

const errorBadge = path.join(__dirname,'public/problem-unknown-red.svg');
server.route({
    path: '/{account}/{repo}/badge',
    method: 'GET',
    handler: (request, reply) => {
        const {account,repo} = request.params;
        const color = request.query.color || "brightgreen";
        server.methods.getLicense(account,repo, (err,result) => {
            if(err){
                console.log("xxx");
                reply.file(errorBadge).type('image/svg+xml');
            }
            else{
                server.methods.getBadge(result.license, color,(err, result) =>{
                    if(err){
                        console.log("YYY");
                        reply.file(errorBadge).type('image/svg+xml');
                    }
                    else{
                        reply(result).type('image/svg+xml');
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
        const {account, repo} = request.params;
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
    path: '/',
    method: 'GET',
    handler: (request, reply) =>{
        reply("Hello World");
    }
})
server.start(function(err) {
    if(err)
        console.log(err);
    else
        console.log('Server started: ' + server.info.uri);
});
