var FalcorServer = require('falcor-express'),
    bodyParser = require('body-parser'),
    express = require('express'),
    Router = require('falcor-router'),
    app = express(),
    data = {
        names: [
            {name: 'a'},
            {name: 'b'},
            {name: 'c'}
        ]
    },
    NamesRouter = Router.createClass([
        {
            route: 'names[{integers:nameIndexes}]["name"]',
            get: (pathSet) => {
                var results = [];
                pathSet.nameIndexes.forEach(nameIndex => {
                    if (data.names.length > nameIndex) {
                        results.push({
                            path: ['names', nameIndex, 'name'],
                            value: data.names[nameIndex].name
                        })
                    }
                })
                return results
            }
        },
        {
            route: 'names.length',
            get: () => {
                return {path: ['names', 'length'], value: data.names.length}
            }
        },
        {
            route: 'names.add',
            call: (callPath, args) => {
                console.log(callPath, args);
                var newName = args[0];

                data.names.push({name: newName})

                return [
                    {
                        path: ['names', data.names.length-1, 'name'],
                        value: newName
                    },
                    {
                        path: ['names', 'length'],
                        value: data.names.length
                    }
                ]
            }
        }
    ])

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