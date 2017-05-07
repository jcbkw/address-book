/* global __dirname */

var express = require('express'),
    bodyParser = require("body-parser"),
    addPostHandler = require('./backend/post/add'),
    removePostHandler = require('./backend/post/remove'),
    port = 3000,
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/add.html', addPostHandler);
app.post('/edit.html', addPostHandler);
app.post('/remove.html', removePostHandler);
app.use('/', express.static(__dirname));

app.listen(port, function() { 

    console.log('Server running at', 'http://localhost:' + port);
    console.log('Press Ctrl + C to stop');
    
});