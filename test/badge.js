const Code = require("code");
const expect = Code.expect;
const getServer = require("../src/start");
const lab = exports.lab = require("@hapi/lab").script();

lab.experiment("Get badge", () => {
    let server;
    lab.before(async () => {
        server = await getServer();
    });
    lab.test("server to return svg file with random repo", {
        timeout: 5000
    }, async () => {
        const user = Math.random().toString(36).slice(2); //random user
        const repo = Math.random().toString(36).slice(2); //random repo
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/svg+xml");
        expect(response.result).to.include("unknown");
    });

    lab.test("server to return svg file with BSD 3-Clause license from this repo .gitlicense", {
        timeout: 5000
    }, async () => {
        const user = "ducthienbui97";
        const repo = "gitlicense";
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/svg+xml");
        expect(response.result).to.include("license");
        expect(response.result).to.include("BSD 3-Clause");
    });

    lab.test("server to return svg file with MIT license from lmgtfy-react repo thru GitHub api", {
        timeout: 5000
    }, async () => {
        const user = "ducthienbui97";
        const repo = "lmgtfy-react";
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/svg+xml");
        expect(response.result).to.include("license");
        expect(response.result).to.include("MIT");
    });


    lab.test("server return value with color = red", {
        timeout: 5000
    }, async () => {
        const user = "ducthienbui97";
        const repo = "gitlicense";
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo + "?color=red"
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/svg+xml");
        expect(response.result).to.include("e05d44");
    });
    lab.test("server return value with color = 0f0f0f", {
        timeout: 5000
    }, async () => {
        const user = "ducthienbui97";
        const repo = "gitlicense";
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo + "?color=0f0f0f"
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/svg+xml");
        expect(response.result).to.include("0f0f0f");
    });

    lab.test("server return value with color = random", {
        timeout: 5000
    }, async () => {
        const user = "ducthienbui97";
        const repo = "gitlicense";
        const color = Math.random().toString(36).slice(2);
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo + "?color=" + color
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.headers["content-type"]).to.equal("image/svg+xml");
        expect(response.result).to.include(color);
    });

});