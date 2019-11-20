let loki = require('lokijs');
let databaseFunctions = require('./app/server/database.js');
databaseFunctions.setDatabase(new loki('../database.json'));


console.log("Brilliant Labs Cloud 2.0");
console.log("Licence GPL v3.0");

let httpServer = require('./app/server/http-server.js');
let wsServer = require('./app/server/ws-server.js');
let MQTTBroker = require('./app/server/mqtt-server.js');

// Start http server
let wss = wsServer.startWebsocketServer(8080);
httpServer.startHttpServer(3000, wss);
MQTTBroker.startMQTTBroker(1883, wss);

