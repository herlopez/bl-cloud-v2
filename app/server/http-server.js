let express = require('express');
let path = require('path');
let app = express();
let pug = require('pug');
let fs = require('fs');

let processor = require('./message-processor.js');
let bodyParser = require('body-parser');

app.set('views', path.join(__dirname, '../../views'));
app.use(express.static(path.join(__dirname, '../../public')));

app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(bodyParser.json());

function startHttpServer(port){
    app.get('/documentation', (req, res) => {
        res.redirect('https://github.com/Brilliant-Labs/cloud/blob/master/README.md');
    });
    app.get('/api', (req, res) => {
        processor.messageProcessor(req.body, res, 'http');
    });
    app.listen(port, () => {
        console.log(`Http server is up on port ${port}`);
    });

}

module.exports = {
    startHttpServer
};
