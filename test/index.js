const Code = require('code');
const expect = Code.expect;
const server = require('../src/start');
const lab = exports.lab = require('lab').script();

lab.experiment("Get home page", () => {
    lab.test("server to return home page",{timeout: 5000}, (done) => {
        const options = {
            method: "GET",
            url: "/" + Math.random().toString(36).slice(2)
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.result).to.include('Hello world'); //will change later
            done();
        });
    });
});
