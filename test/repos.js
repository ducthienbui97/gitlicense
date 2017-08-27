const Code = require("code");
const expect = Code.expect;
const server = require("../src/start");
const lab = exports.lab = require("lab").script();

lab.experiment("Get repo url", () => {
    lab.test("server to redirect to home with random repo", {
        timeout: 5000
    }, (done) => {
        const user = Math.random().toString(36).slice(2); //random user
        const repo = Math.random().toString(36).slice(2); //random repo
        const options = {
            method: "GET",
            url: "/repository/" + user + "/" + repo
        };
        server.inject(options, function (response) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal("/");
            done();
        });
    });
    lab.test("server to return normal with this repo", {
        timeout: 5000
    }, (done) => {
        const user = "ducthienbui97";
        const repo = "gitlicense";
        const options = {
            method: "GET",
            url: "/repository/" + user + "/" + repo
        };
        server.inject(options, function (response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.include("ducthienbui97/gitlicense");
            expect(response.result).to.include("<h2>Markdown:</h2>");
            expect(response.result).to.include("<h2>reStructuredText:</h2>");
            expect(response.result).to.include("<h2>HTML:</h2>");
            done();
        });
    })
});