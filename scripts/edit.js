/* global contact */

(function () {
    
    /**
     * Handles the form submit event
     * @param {Event} e
     */
    function formSubmitHandler (e) {
        
        e.preventDefault();
        
        var xhr = new XMLHttpRequest(),
            form = this,
            items = form.querySelectorAll("input[name]"),
            payload =[],
            query = getQuery(),
            i;
           
         // Gathers an a array of form data from form inputs with the name attribute.
         // from this array we loop through all name attributes
        for (i = 0; i < items.length; i += 1 ){

            var item = items[i];

            payload.push(encodeURIComponent(item.name) + "=" + encodeURIComponent(item.value));

        }
        
        payload.push("id=" + encodeURIComponent(query.id));

        xhr.open("POST", location.pathname, /*async*/true);
        
        xhr.addEventListener("load", function (e) {
            
            switch (/*xhr*/this.status) {
                
                case  200 : 
                    showMessage("Saved!");
                    close();
                    break;
                
                case  406 : 
                    
                    var errors = JSON.parse(this.responseText);
                    
                    showMessage(errors.join('<br>'), true /*iserror*/); 
                    
                break;
                
                // things are bad
                default   : showMessage("We are experiencing some difficulties right now, please try again later", true /*iserror*/); break;
               
            }
            
        });
        
        xhr.addEventListener("error", function () {
            
            // things are really bad
            showMessage("We are experiencing some difficulties right now, please try again later", true /*iserror*/);
            
        });
        
        // Send the proper header information along with the request to the backend.
        // "When sending data to a server"
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(payload.join("&"));
        
    }
    
    function showMessage (messageHtmlString, isErrorBoolean) {
        
        // create the div that's going to contain the message
        var messageDiv = document.createElement('div');
        
        // add the bootstrap class alert to it
        // see https://www.w3schools.com/bootstrap/bootstrap_alerts.asp
        messageDiv.classList.add('alert');
        
        // if it is an error
        if (isErrorBoolean) {
            
            // add class alert-danger
            messageDiv.classList.add('alert-danger');
            
        }
        else {
            
            // it's a success
            messageDiv.classList.add('alert-success');
            
        }
        
        // then add the error html to the div
        messageDiv.innerHTML = messageHtmlString;
        
        // then add it right before the form...
        
        // by getting a hold of the form
        var contactForm = document.getElementById("newContact");
        
        // and asking the form's parent to put the div right before
        // the form for me
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // then schedule to remove that div in 5 seconds
        setTimeout(function () {
            
            messageDiv.parentNode.removeChild(messageDiv);
            
        }, 5000);
        
        // then scroll the browser to the top
        scrollTo(0, 0);
        
    }
    
    function renderContact(form) {
        
        var items = form.querySelectorAll("input[name]"),
            address = window.contact.getAddress(),
            name = window.contact.name.split(" "),    
            phone = window.contact.phone,
            firstName = name[0],
            lastName = name[1],
            item,
            i;
           
        for (i = 0; i < items.length; i += 1 ){
            
            item = items[i];
            
            switch (item.name) {
                
                case "city"             : item.value = address.city;      break;
                case "state"            : item.value = address.state;     break;
                case "zip"              : item.value = address.zip;       break;
                case "street_1"         : item.value = address.street;    break;
                case "street_2"         : item.value = address.street2;   break;
                case "phone_number"     : item.value = phone;             break;
                case "last_name"        : item.value = lastName;          break;
                case "first_name"       : item.value = firstName;         break;
                
            }
            
        }
        
    }
    
    // Attachings all relevant DOM event handlers here
    function bindEvents () {

        var form = document.getElementById("newContact");
        
        form.addEventListener("submit", formSubmitHandler, false);
        
        renderContact(form);
        
    }
    
    // start using the dom once ready
    document.addEventListener('DOMContentLoaded', bindEvents, false);

})();