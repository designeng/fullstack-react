var Router = require('falcor-router');

var events = {
        titles: [
            {title: 'a'},
            {title: 'b'},
            {title: 'c'}
        ]
    };

var EventsRouterFactory = (socketIo) => {

    setTimeout(() => {socketIo.emit('join')}, 2000);

    return Router.createClass([
        {
            route: 'events',
            get: (pathSet) => {
                var results = [];
                pathSet.nameIndexes.forEach(nameIndex => {
                    if (data.names.length > nameIndex) {
                        results.push({
                            path: ['titles', nameIndex, 'title'],
                            value: data.names[nameIndex].name
                        })
                    }
                })
                return results
            }
        }
    ]);
};

module.exports = EventsRouterFactory;


///////
// export default class Server {

//     constructor(port = 8080, config = { path: "/" }, event = "falcor") {
//         this.socket = new SocketIo();
//         this.socket.on("connection", (socket) => {
//             socket.on(event, ({ args, functionPath, id, jsonGraphEnvelope, method, pathSets, refSuffixes, thisPaths }) => {
//                 if (["call", "get", "set"].includes(method)) {
//                     let parameters = [];
//                     switch (method) {
//                         case "call":
//                             parameters = [functionPath, args, refSuffixes, thisPaths];
//                             break;
//                         case "get":
//                             parameters = [pathSets];
//                             break;
//                         case "set":
//                             parameters = [jsonGraphEnvelope];
//                             break;
//                     }
//                     Router[method](...parameters).subscribe((data) => {
//                         data.id = id;
//                         socket.emit(event, data);
//                     });
//                 } else {
//                     throw new Error(method + " is not a valid method");
//                 }
//             });
//         });
//         this.socket.listen(port, config);
//     }

//     getUrl() {
//         return "ws://localhost:" + this.socket.httpServer.address().port;
//     }

// }