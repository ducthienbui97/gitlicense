const axios = require("axios");
const base64 = require("base-64");
const config = require("./config");
const badge = require("gh-badges");

const extractLicense = (content) => {
    if ("license" in content) {
        if ("url" in content) {
            return {
                license: content["license"],
                url: content["url"]
            };
        } else {
            const url = "https://spdx.org/licenses/" + content.license + ".html";
            return {
                license: content["license"],
                url
            };
        }
    }
    throw new Error("No license declared");
};

const getLicense = async (account, repo) => {
    const githubApiUrl = "https://api.github.com/repos/" + account + "/" + repo;
    let OAuth2 = "";
    if (process.env.GITHUB_ID) {
        OAuth2 = "?client_id=" + process.env.GITHUB_ID + "&client_secret=" + process.env.GITHUB_SECRET; //rate limit
    }
    try {
        let res = await axios.get(githubApiUrl + "/contents/.gitlicense" + OAuth2)
        const content = JSON.parse(base64.decode(res.data.content));
        return extractLicense(content);
    } catch (err) {
        try {
            let res = await axios.get(githubApiUrl + "/license" + OAuth2, {
                headers: {
                    "Accept": "application/vnd.github.drax-preview+json"
                }
            });
            return {
                license: res.data.license.spdx_id,
                url: res.data.html_url
            }
            
        } catch (err) {
            throw err;
        }
    }
};

const getBadge = (license, color) => {
    return new Promise((resolve, reject) => {
        badge.loadFont(config.badge.font, (err) => {
            if (err) {
                reject(err);
            } else {
                badge({
                    text: ["license", license],
                    template: "flat",
                    colorB: color
                }, (svg, err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(svg);
                    }
                });
            }
        });
    })
};

const getColor = (query) => {
    const color = query || "brightgreen";
    if (color in config.badge.colors) {
        return config.badge.colors[color];
    } else {
        return {
            "colorB": color
        };
    }
};

module.exports = {
    getBadge,
    getLicense,
    getColor
};