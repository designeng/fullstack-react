var FalcorServer = require('falcor-express'),
    bodyParser = require('body-parser'),
    NamesRouter = require('./routers/usual'),
    EventsRouterFactory = require('./routers/socket');

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var routes = require('./routes/index');

var EventsRouter = EventsRouterFactory(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/model.json', FalcorServer.dataSourceRoute(() => new NamesRouter()));
app.use('/events.json', FalcorServer.dataSourceRoute(() => new EventsRouter()));

app.use('/api', routes);

app.use(express.static('.'));

/* 404 */
app.use(function(req, res, next) {
  var err = new Error('Route is not found!');
  err.status = 404;
  next(err);
});

var handleClient = function (socket) {
    var tweet = {user: "nodesource", text: "Hello, world!"};
    setTimeout(function () {
        socket.emit("tweet", tweet);
    }, 1000);
};

io.on("connection", handleClient);

// exports server, not app (server wrapped app)
module.exports = server;