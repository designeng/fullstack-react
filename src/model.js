var Falcor = require('falcor');
var FalcorDataSource = require('falcor-http-datasource');
var meld = require('meld');

var model = new Falcor.Model({
    source: new FalcorDataSource('/model.json')
});

meld.around(model, "call", function (joinpoint) {
    console.log("around:", joinpoint);

    var callPath    = joinpoint.args[0];
    var args        = joinpoint.args[1];
    return joinpoint.proceed(callPath, args);
});

module.exports = model