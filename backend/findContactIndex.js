module.exports = function (contactId, contactList) {
    
    var result = -1;
    
    contactList.some(function (existingContact, index) {
        
        if (existingContact.id === contactId) {
            
            result = index;
            
        }
        
        return result !== -1;
        
    });
    
    return result;
    
};