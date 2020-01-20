let express = require('express');
let path = require('path');
let app = express();
let pug = require('pug');
let fs = require('fs');
let db = require('./database.js');

let processor = require('./message-processor.js');
let bodyParser = require('body-parser');

app.set('views', path.join(__dirname, '../../views'));
app.use(express.static(path.join(__dirname, '../../public')));

app.set('view engine', 'pug');
app.enable('trust proxy');
app.use(bodyParser.json());

function startHttpServer(port, wss){

    app.get('/', (req, res)=> {
        res.render('index');
    });
    app.get('/app', (req, res)=> {
        res.render('app');
    });
    app.get('/data', (req, res) =>{
        const search_params = new URLSearchParams(req.url);
        console.log(search_params, search_params.get('/data?key'));
        const file = '/tmp/data.csv';
        let msg = {};
        msg.id = search_params.get('/data?key');
        let projectData = db.rawProjectData().data.find(project => project.key === msg.id)
        let projectDataCSV = '';
        let charts = projectData['charts'];
        projectDataCSV += 'Chart Name,Chart Type,Chart ID,Entries,Timestamp,X/Value, Y';
        for(let chart in charts){
            console.log(charts[chart]);
            let x = charts[chart];
            projectDataCSV += `\n${x.name},${x.type},${x.id},,,,`;
            console.log(x);
            let points = x.data;
            if(x.type === 'LINE') {
                for (let point in points) {
                    projectDataCSV += `\n,,,${points[point].entry},${points[point].timestamp},${points[point].value}`;
                }
            }
            if(x.type === 'SCATTER') {
                for (let point in points) {
                    projectDataCSV += `\n,,,${points[point].entry},${points[point].timestamp},${points[point].x},${points[point].y}`;
                }
            }
        }
        fs.writeFileSync(file, projectDataCSV, 'utf8', function (err) {
            if (err) {
                console.log('Some error occured - file either not saved or corrupted file saved.');
            } else{
                console.log('It\'s saved!');
            }
        });
        res.download(file);

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
        processor.msgProcessor(req.body, res, 'http', wss);
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
