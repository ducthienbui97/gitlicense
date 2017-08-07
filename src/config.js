const path = require('path');

const serverMethod = {
    cache:{
        cache:'diskCache',
        expiresIn: 86400000,
        generateTimeout: false
    }
}
const connection = {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3000,
    router: {
        isCaseSensitive: false,
        stripTrailingSlash: true
    },
    routes: {cors: true}
}
const server = {
    cache : [{
            name      : 'diskCache',
            engine    : require('catbox-disk'),
            cachePath: path.join(__dirname,'cache'),
            cleanEvery: 86400000,
            partition : 'cache'
    }]
}
const badge = {
    errorBadge: path.join(__dirname,'../public/problem-unknown-red.svg'),
    font: path.join(__dirname,'../public/OpenSans/OpenSans-ExtraBold.ttf'),
    returnType: 'image/svg+xml',
    defaultColor: 'brightgreen'
}

module.exports = {
    server,
    serverMethod,
    connection,
    badge
}
