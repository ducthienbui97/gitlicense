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

const getLicense = (account, repo, next) => {
    const githubApiUrl = "https://api.github.com/repos/" + account + "/" + repo;
    let OAuth2 = "";
    if (process.env.GITHUB_ID) {
        OAuth2 = "?client_id=" + process.env.GITHUB_ID + "&client_secret=" + process.env.GITHUB_SECRET; //rate limit
    }
    axios.get(githubApiUrl + "/contents/.gitlicense" + OAuth2)
        .then((res) => {
            const content = JSON.parse(base64.decode(res.data.content));
            next(null, extractLicense(content));
        })
        .catch((err) => {
            axios.get(githubApiUrl + "/license" + OAuth2, {
                    headers: {
                        "Accept": "application/vnd.github.drax-preview+json"
                    }
                })
                .then((res) => {
                    next(null, {
                        license: res.data.license.spdx_id,
                        url: res.data.html_url
                    });
                })
                .catch((err) => {
                    next(err, null);
                });
        });
};

const getBadge = (license, color, next) => {
    badge.loadFont(config.badge.font, (err) => {
        if (err) {
            next(err, null);
        } else {
            badge({
                text: ["license", license],
                template: "flat",
                colorB: color
            }, (svg, err) => {
                if (err) {
                    next(err, null);
                } else {
                    next(null, svg);
                }
            });
        }
    });
};

const defaultColor = "brightgreen";

const getColor = (color = defaultColor) => {
    if (color in config.badge.colors) {
        return config.badge.colors[color];
    } else {
        return {
            "colorB": color
        };
    }
};

const getColorName = (color) => {
  if (color in config.badge.colors) {
    return color;
  }
  return defaultColor;
};


module.exports = {
    getBadge,
    getLicense,
    getColor,
    getColorName
};
