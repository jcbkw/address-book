/* global __dirname */

var file = require("fs"),
    path = require("path"),
    root = path.normalize(path.join(__dirname, '..', '..'));

module.exports = function (request, response) {
        
    var contact = {
         
         "id": (Math.round(Math.random() * 9999) + Date.now()).toString(16),
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
        
        // validate it for errors
        var errors = validate(contact, contactJsonObject.contactList);
        
        // no errors found
        if (errors.length === 0) {
            
            // append th e new contact
            contactJsonObject.contactList.push(contact);

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

function validate (contact, contactList) {
    
    var errors = [];
    
    if (nameCannotBeEmpty(contact) === false) {
        
        errors.push('The contact name cannot be empty!');
        
    }
    
    if (nameMustBeUnique(contact, contactList) === false) {
        
        errors.push('The contact name "' + contact.name + '" already exists!');
        
    }
    
    return errors;
    
}

function nameCannotBeEmpty (contact) {
    
    return contact.name.trim().length !== 0;
    
}

function nameMustBeUnique (contact, contactList) {
    
    var result = true;
    
    contactList.every(function (existingContact) {
        
        return result = existingContact.name !== contact.name;
        
    });
    
    return result;
    
}