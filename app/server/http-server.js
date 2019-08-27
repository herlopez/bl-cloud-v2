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
    app.get('/', (req, res)=> {
        res.render('index');
    });
    app.get('/app', (req, res)=> {
        res.render('app');
    });
    app.get('/documentation', (req, res) => {
        res.redirect('https://github.com/Brilliant-Labs/cloud/blob/master/README.md');
    });
    app.get('/verification', (req, res) => {
        const search_params = new URLSearchParams(req.url);
        console.log(search_params.get('confirmation'));
        res.render('app');
    });
    app.get('/api', (req, res) => {
        processor.messageProcessor(req.body, res, 'http');
    });
    app.listen(port, () => {
        console.log(`Http server is up on port ${port}`);
    });
    app.use((req, res, next) => {
        let err = new Error('Not Found');
        res.render('404');
        err.status = 404;
        next(err);
    });

}

module.exports = {
    startHttpServer
};
