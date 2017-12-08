var http = require('http');
var app = require('./config/config-express')();


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express Listening on port ' + app.get
    ('port'));
});