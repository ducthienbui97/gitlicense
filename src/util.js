const axios = require('axios');
const base64 = require('base-64');
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
module.exports = {
    getBadge,
    getLicense
}
