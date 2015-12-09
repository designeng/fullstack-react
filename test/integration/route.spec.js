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

    it('model.json path exists', function (done) {
        apitest.get('/model.json?paths=[["names","length"]]&method=get').expect(200, done);
    });
});