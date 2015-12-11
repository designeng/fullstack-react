var FalcorServer = require('falcor-express'),
    bodyParser = require('body-parser'),
    express = require('express'),
    NamesRouter = require('./routers/usual'),
    EventsRouterFactory = require('./routers/socket'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

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

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });
});

module.exports = app;