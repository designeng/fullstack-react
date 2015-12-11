var Router = require('falcor-router');

var data = {
        names: [
            {name: 'a'},
            {name: 'b'},
            {name: 'c'}
        ]
    };
    
var NamesRouter = Router.createClass([
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
                // return When.promise((resolve, reject, notify) => {
                //     setTimeout(() => resolve({path: ['names', 'length'], value: data.names.length}) , 5000);
                // })
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
    ]);

module.exports = NamesRouter;