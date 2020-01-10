const Code = require("code");
const expect = Code.expect;
const getServer = require("../src/start");
const lab = exports.lab = require("lab").script();

lab.experiment("Get home page", () => {
    let server;
    lab.before(async () => {
        server = await getServer();
    });
    lab.test("server to redirect to home page on abitrary link", {
        timeout: 5000
    }, async() => {
        const options = {
            method: "GET",
            url: "/" + Math.random().toString(36).slice(2)
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(302);
        expect(response.headers.location).to.equal("/");
    });
    lab.test("server to return to home page", {
        timeout: 5000
    }, async () => {
        const options = {
            method: "GET",
            url: "/"
        };
        const response = await server.inject(options);
        expect(response.statusCode).to.equal(200);
        expect(response.result).to.include("Simple way to display your license badge.");    
    });
});