var http = require('http');
var fs = require('fs');
var path = require('path');
var util = require('./util');
var map = require('../mock/map');

var ROOT_PATH = path.join(process.cwd(), '/mock/data');

function mockServer (devConfig) {
    if (!devConfig || !devConfig.port) {
        return;
    }
    var mockServer = http.createServer(function (request, response) {
        console.log(request.method + ':' + request.url);
        var urlPath = util.parsePath(request.url);
        var jsonPath = map[urlPath];

        jsonPath = path.join(ROOT_PATH, jsonPath + '.json');

        var exist = fs.existsSync(jsonPath);

        if (!exist) {
            response.writeHead(404, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With",
                "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
                "X-Powered-By":' 3.2.1',
                'Content-Type':'application/json'
            });
            response.end();
            return;
        }

        fs.readFile(jsonPath, (err, data) => {
            if (err) {
                throw err;
            }
            response.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With",
                "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
                "X-Powered-By":' 3.2.1',
                'Content-Type':'application/json'
            });
            setTimeout(() => {
                response.end(data);
            }, 500);
        });
    });

    mockServer.listen(devConfig.port, devConfig.host, () => {
        console.log('*****************************************************');
        console.log(`listening ${devConfig.host}:${devConfig.port}`);
        console.log('*****************************************************');
    });
    return mockServer;
}

module.exports = mockServer;
