/* global __dirname */

var express = require('express'),
    bodyParser = require("body-parser"),
    path = require("path"),
    file = require("fs"),
    port = 3000,
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// all .html requests go to index.html
app.post('/manage.html', function (request, response) {
        
    var contact = {
        
         "name": request.body.first_name + ' ' + request.body.last_name,
         "phone": request.body.phone_number,  
         "avatar": "avatars_00.png",  
         
         "address": {
            
           "street": request.body.street_1,
           "street2": request.body.street_2,
           "city": request.body.city,
           "state": request.body.state,
           "zip": request.body.zip
           
         }

    };
    
    var contactJsonFile = __dirname + '/data/contacts.json';
    
    // read the file
    file.readFile(contactJsonFile, 'utf8', function onComplete (error, contactFileText) {
        
        // on error, stop
        if (error) {
            throw error;
        }
        
        // parse is to a JS object
        var contactJsonObject = JSON.parse(contactFileText);
        
        // append th e new contact
        contactJsonObject.contactList.push(contact);
        
        // stringify the JS object back to a plain text
        contactFileText = JSON.stringify(contactJsonObject, null, 4);
        
        file.writeFile(contactJsonFile, contactFileText, 'utf8', function onComplete (error) {
            
            // on error, stop
            if (error) {
                throw error;
            }
            
            // done
            response.send('done');
            
        });
    
    });
    
});

app.use('/', express.static(__dirname));

app.listen(port, function() { 

    console.log('Server running at', 'http://localhost:' + port);
    console.log('Press Ctrl + C to stop');
    
});