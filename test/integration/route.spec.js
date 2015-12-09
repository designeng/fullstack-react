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

    it('model.json post should throw 500 error without args', function (done) {
        apitest.post('/model.json')
            .expect(500, done);
    });

    // TODO
    it('model.json should accept post request', function (done) {
        apitest.post('/model.json')
            .send({ 
                method    : 'call', 
                callPath  : ['names','add'],
                arguments : ['1234567']
            })
            .expect(200, done);
    });
});