const axios = require('axios');
const base64 = require('base-64');
const config = require('./config');
const badge = require('gh-badges');
const getLicense = (account, repo, next) =>{
    const githubApiUrl = 'https://api.github.com/repos/' + account + '/'+ repo;
    let OAuth2 = '';
    if(process.env.GITHUB_ID){
        OAuth2 = '?client_id='+process.env.GITHUB_ID+'&client_secret='+process.env.GITHUB_SECRET; //rate limit
    }
    axios.get(githubApiUrl + '/contents/.gitlicense'+addition)
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
        axios.get(githubApiUrl + '/license' + addition,{
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

const getBadge = (license, color, next) =>{
    badge.loadFont(config.badge.font, (err)=>{
        if(err){
            next(err,null);
        }
        else{
            badge({ text: ["license", license], template: "flat", colorB: color},(svg,err) =>{
                if(err){
                    next(err,null);
                }
                else{
                    next(null,svg);
                }
            })
        }
    })
}

const getColor = (query) =>{
    const color = query || "brightgreen";
    return config.badge.colors[color] ||{"colorB": color};
}
module.exports = {
    getBadge,
    getLicense,
    getColor
}
