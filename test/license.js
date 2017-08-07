const Code = require('code');
const expect = Code.expect;
const server = require('../src/start');
const lab = exports.lab = require('lab').script();

lab.experiment("Get license url", () => {
    lab.test("server to redirect to home with random repo",{timeout: 5000}, (done) => {
        const user = Math.random().toString(36).slice(2); //random user
        const repo = Math.random().toString(36).slice(2); //random repo
        const options = {
            method: "GET",
            url: "/"+user+"/"+repo+"/license"
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal('/');
            done();
        });
    });
    lab.test("server to return svg file with this repo",{timeout: 5000}, (done) => {
        const user = 'ducthienbui97'; //random user
        const repo = 'gitlicense'; //random repo
        const options = {
            method: "GET",
            url: "/"+user+"/"+repo+"/license"
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(302);
            expect(response.headers.location).to.equal('https://github.com/ducthienbui97/gitlicense/blob/master/LICENSE');
            done();
        });
    })
});
