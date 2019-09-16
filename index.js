let loki = require('lokijs');
let databaseFunctions = require('./app/server/database.js');
databaseFunctions.setDatabase(new loki('database.json'));


console.log("Brilliant Labs Cloud 2.0");
console.log("Licence GPL v3.0");

let httpServer = require('./app/server/http-server.js');
let wsServer = require('./app/server/ws-server.js');
let MQTTBroker = require('./app/server/mqtt-server.js');

// Start http server
httpServer.startHttpServer(3000);
wsServer.startWebsocketServer(8080);
MQTTBroker.startMQTTBroker(1883);

