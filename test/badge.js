
const server = require('../src/start');
const lab = exports.lab = require('lab').script();

lab.experiment("Get badge", () => {
    lab.test("server to return svg file",{timeout: 5000}, (done) => {
        const user = Math.random().toString(36).slice(2); //random user
        const repo = Math.random().toString(36).slice(2); //random repo
        const options = {
            method: "GET",
            url: "/"+user+"/"+repo+"/badge"
        };
        server.inject(options, function(response) {
            lab.expect(response.statusCode).to.equal(200);
            lab.expect(response.headers['content-type']).to.equal('image/svg+xml');
            done();
        });
    });
});
