var FalcorServer = require('falcor-express'),
    bodyParser = require('body-parser'),
    express = require('express'),
    NamesRouter = require('./routers/usual'),
    app = express();

var routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/model.json', FalcorServer.dataSourceRoute(() => new NamesRouter()));

app.use('/api', routes);
app.use(express.static('.'));

/* 404 */
app.use(function(req, res, next) {
  var err = new Error('Route is not found!');
  err.status = 404;
  next(err);
});

module.exports = app;