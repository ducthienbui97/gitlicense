const Code = require("code");
const expect = Code.expect;
const server = require("../src/start");
const lab = exports.lab = require("lab").script();

lab.experiment("Get home page", () => {
    lab.test("server to redirect to home page on abitrary link", {
        timeout: 5000
    }, (done) => {
        const options = {
            method: "GET",
            url: "/" + Math.random().toString(36).slice(2)
        };
        server.inject(options, function (response) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal("/");
            done();
        });
    });
    lab.test("server to return to home page", {
        timeout: 5000
    }, (done) => {
        const options = {
            method: "GET",
            url: "/"
        };
        server.inject(options, function (response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.include("Simple way to display your license badge.");
            done();
        });
    });
});