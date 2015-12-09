var app      = require('../../server/app.js');

var request  = require('supertest');
var apitest = request(app);

describe('integration', function () {
    beforeEach(function () {

    });

    it('path exists', function (done) {
        apitest.get('/api/test').expect(200, done);
    });

    xit('model.json path exists', function (done) {
        apitest.get('/model.json').expect(200, done);
    });
});