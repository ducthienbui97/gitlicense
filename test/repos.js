const Code = require("code");
const expect = Code.expect;
const getServer = require("../src/start");
const lab = exports.lab = require("lab").script();

lab.experiment("Get repo url", () => {
    let server;
    lab.before(async () => {
        server = await getServer();
    });
    lab.test("server to redirect to home with random repo", {
        timeout: 5000
    }, async () => {
        const user = Math.random().toString(36).slice(2); //random user
        const repo = Math.random().toString(36).slice(2); //random repo
        const options = {
            method: "GET",
            url: "/repository/" + user + "/" + repo
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal("/");
    });
    lab.test("server to return normal with this repo", {
        timeout: 5000
    }, async () => {
        const user = "ducthienbui97";
        const repo = "gitlicense";
        const options = {
            method: "GET",
            url: "/repository/" + user + "/" + repo
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.include("ducthienbui97/gitlicense");
        expect(response.result).to.include("<h2>Markdown</h2>");
        expect(response.result).to.include("<h2>reStructuredText</h2>");
        expect(response.result).to.include("<h2>HTML</h2>");
    });
});