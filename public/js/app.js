var serverStatus = false;
var ws; // WebSocket Handler

setInterval(function () {
  if (!serverStatus) {
    try {
      ws = new WebSocket('wss://cloud.brilliantlabs.ca/wsapi/');

      ws.onopen = function open() {
        serverStatus = true;
        ws.send('{"cmd":"WS_OPEN", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
      };

      ws.onclose = function close() {
        serverStatus = false;
        ws.send('{"cmd":"WS_CLOSED", "key":"mv0w9g4j0mada0dfm43a0vmq0vimvf0mcq"}');
      };

      ws.onmessage = function incoming(data) {
        console.log(data);
        messageProcessor(data, ws);
      };

      ws.error = function incoming(data) {
        console.log(data);
      };
    } catch (e) {
      console.log(e);
      serverStatus = false;
    }
  }
}, 1000);

function messageProcessor(message, callback) {
  console.log('Message Received: ', message);

  try {
    console.log(message);
    message = JSON.parse(message.data);
    console.log(message.results);
  } catch (e) {
    console.log(e);
    callback.send("{\"error\":\"Unable to parse JSON: ".concat(e, "\"}"));
    return;
  }

  if (message.hasOwnProperty('fn')) {
    var fn = message['fn'];

    try {
      var iFn = new Function(fn);
      iFn();
    } catch (e) {
      callback.send("{\"error\":\"Unable to execute function: ".concat(e, "\"}"));
    }
  }
}