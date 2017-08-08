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
    errorBadge: path.join(__dirname,'../public/assets/problem-unknown-red.svg'),
    font: path.join(__dirname,'../public/assets/OpenSans/OpenSans-ExtraBold.ttf'),
    returnType: 'image/svg+xml',
    colors: {
        "brightgreen":    { "colorB": "#4c1" },
        "green":          { "colorB": "#97CA00" },
        "yellow":         { "colorB": "#dfb317" },
        "yellowgreen":    { "colorB": "#a4a61d" },
        "orange":         { "colorB": "#fe7d37" },
        "red":            { "colorB": "#e05d44" },
        "blue":           { "colorB": "#007ec6" },
        "grey":           { "colorB": "#555" },
        "gray":           { "colorB": "#555" },
        "lightgrey":      { "colorB": "#9f9f9f" },
        "lightgray":      { "colorB": "#9f9f9f" }
    }
}

const homePage = path.join(__dirname, '../public/README.html');
module.exports = {
    server,
    serverMethod,
    connection,
    badge,
    homePage
}
