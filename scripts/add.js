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
            i;

        for (i = 0; i < items.length; i += 1 ){

            var item = items[i];

            payload.push(encodeURIComponent(item.name) + "=" + encodeURIComponent(item.value));

        }

        xhr.open("POST", location.pathname, /*async*/true);
        
        xhr.addEventListener("load", function (e) {
            
            switch (/*xhr*/this.status) {
                
                case  200 : showMessage("Saved!"); break;
                
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
    
    // Attachings all relevant DOM event handlers here
    function bindEvents () {

        document.getElementById("newContact")
                .addEventListener("submit", formSubmitHandler, false);
        
    }
    
    // start using the dom once ready
    document.addEventListener('DOMContentLoaded', bindEvents, false);

})();