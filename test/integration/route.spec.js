var app      = require('../../server/app.js');

var model      = require('../../model.js');

var request  = require('supertest');
var apitest = request(app);

describe('integration', function () {
    beforeEach(function () {

    });

    it('/api/test path exists', function (done) {
        apitest.get('/api/test').expect(200, done);
    });

    it('model.json path exists and should accept get request', function (done) {
        apitest.get('/model.json?paths=[["names","length"]]&method=get').expect(200, done);
    });

    // TODO
    xit('model.json should accept post request', function (done) {
        apitest.post('/model.json')
            // .send({ method    : 'call' })
            // .send({ callPath  : ["names", "add"]})
            // .send({ arguments : ["1234567"] })
            .field( 'method', 'call' )
            // .field( callPath  : ["names", "add"] )
            // .field( arguments : ["1234567"] )
            .expect(200, done);
    });
});