const Code = require('code');
const expect = Code.expect;
const server = require('../src/start');
const lab = exports.lab = require('lab').script();

lab.experiment("Get badge", () => {
    lab.test("server to return svg file with random repo", { timeout: 5000 }, (done) => {
        const user = Math.random().toString(36).slice(2); //random user
        const repo = Math.random().toString(36).slice(2); //random repo
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('image/svg+xml');
            expect(response.result).to.include('unknown');
            done();
        });
    });
    lab.test("server to return svg file with this repo", { timeout: 5000 }, (done) => {
        const user = 'ducthienbui97'; //random user
        const repo = 'gitlicense'; //random repo
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('image/svg+xml');
            expect(response.result).to.include('license');
            done();
        });
    });
    lab.test("server return value with color = red", { timeout: 5000 }, (done) => {
        const user = 'ducthienbui97'; //random user
        const repo = 'gitlicense'; //random repo
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo + "?color=red"
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('image/svg+xml');
            expect(response.result).to.include('e05d44');
            done();
        });
    });
    lab.test("server return value with color = 0f0f0f", { timeout: 5000 }, (done) => {
        const user = 'ducthienbui97'; //random user
        const repo = 'gitlicense'; //random repo
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo + "?color=0f0f0f"
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('image/svg+xml');
            expect(response.result).to.include('0f0f0f');
            done();
        });
    })
    lab.test("server return value with color = random", { timeout: 5000 }, (done) => {
        const user = 'ducthienbui97';
        const repo = 'gitlicense';
        const color = Math.random().toString(36).slice(2);
        const options = {
            method: "GET",
            url: "/badge/" + user + "/" + repo + "?color=" + color
        };
        server.inject(options, function(response) {
            expect(response.statusCode).to.equal(200);
            expect(response.headers['content-type']).to.equal('image/svg+xml');
            expect(response.result).to.include(color);
            done();
        });
    })
});