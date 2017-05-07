/* global __dirname */

var file = require("fs"),
    path = require("path"),
    root = path.normalize(path.join(__dirname, '..', '..')),
    findContactIndex = require('../findContactIndex');

module.exports = function (request, response) {
    
    // constructing the contact json file path
    var contactJsonFile = path.join(root, 'data', 'contacts.json');
    
    // read the file
    file.readFile(contactJsonFile, 'utf8', function onComplete (error, contactFileText) {
        
        // on error, stop
        if (error) {
            throw error;
        }
        
        // parse the contact json text to a JS object
        var contactJsonObject = JSON.parse(contactFileText);
        
        // find the contact's position in the list
        var contactIndex = findContactIndex(request.body.id);
        
        // found
        if (contactIndex !== -1) {
            
            // append th e new contact
            contactJsonObject.contactList.splice(contactIndex);

            // stringify the JS object back to a plain text
            contactFileText = JSON.stringify(contactJsonObject, null, 4);
            
            // overwrite the json text on the disk
            file.writeFile(contactJsonFile, contactFileText, 'utf8', function onComplete (error) {

                // on error, stop
                if (error) {
                    throw error;
                }

                // done
                response.send('done');

            });
            
        }
        //  no bueno
        else {
             
            // send the errors, with a Not Acceptable status
            response.status(406/*HTTP status: Not Acceptable*/).json(errors);
            
        }
    
    });
    
};