$(function (){
   
    var contactMap = {};
     
    function buildContacts (data, template) {

        var contacts = Handlebars.compile(template);
        $(".contact-list").append(contacts(data));
       
    }
    
    function buildAddressBookPage (data, template) {
        
        var mainPage = Handlebars.compile(template);
        $("body").append(mainPage(data));

    }

    function bindEvents(mainElement){

        $(mainElement).on("click", handleItemClick);

    }

    function handleItemClick(e){

        if ( $(e).hasClass("edit-item")){

            //the edit button was clicked
            editContact(e.target);

        }
        else if ( $(e).hasClass("delete-item")){

            //the delete button was clicked
            deleteContact(e.target);

        }

    }

    function editContact(editBtn){

        var id = editBtn.parentNode.getAttribute("contact-id");
        var person = contactMap[id];
        var otherWindow = window.open("../edit.html?id="+ id, '_blank', 'width=640,height=480');
        
        otherWindow.contact = person;
        otherWindow.focus();
        otherWindow.addEventListener("unload", function () {

          location.reload();

        }, /*useCapture */ false);

    }

    function deleteContact(deleteBtn){

        var id = deleteBtn.parentNode.getAttribute("contact-id"),
            xhr = new XMLHttpRequest(),
            payload = "id=" + encodeURIComponent(id),
            i;

        xhr.open("POST", "/remove.html", /*async*/true);

        xhr.addEventListener("load", function (e) {

        if (this.status === 200) {

                deleteBtn.parentNode.parentNode.removeChild(deleteBtn.parentNode); 

        }

        }, /*propagation*/ false);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(payload);
    }
    /**
     * Fetches and parses JSON data using asynchronous requests.
     * 
     * When complete, a call back is invoked to pass on this data object and build the rest
     * of the webpage.
     *   
     * @param {number} i The index at which to start reading the 
     *                   <code>urlArray</code> argument. Usually <code>0</code>.
     * @param {object} dataObj The object in which the ajax response 
     *                         data will be added.
     * @param {string[]} urlArray An array containing the extension-less names
     *                         of the resources to load.
     *                         Each element will be prepended with 
     *                         <code>../data/</code> and appended with
     *                         <code>.json</code> before the request is sent.
     * @param {function} callback Function to call back after completion.
     */
    function loadData(i, dataObj, urlArray, callback){
       //Has a recursive helper function which loops through an array of urls
       //augmenting the data object with reach ajax response.
     
         function complete (content) {
            dataObj[urlArray[i]] = content;

            i += 1;
            
            if (i < urlArray.length) {
                
                $.getJSON("../data/" + urlArray[i] + ".json", complete);
                
            }
            
            else {
                
                callback();
                
            }
            
        }
        $.getJSON("../data/" + urlArray[i] + ".json", complete);

    };
    
    /**
     *Manages asynchronous requests for html template data.
     *When the helper function <code>complete</code> is done, it invokes a 
     *callback function to pass on the template object
     *and continue building the webpage.
     *  
     * @param {object} templateObj The object in which the ajax response html 
     *                             data will be added.
     * @param {string[]} templateNames An array of template names that indicate
     *                                 each resource to load.
     *                         
     * @param {function} callback - Function to call back after completion.
     */
    function loadTemplates(templateObj, templateNames, callback){
        
       var i = 0;
       //It has a helper function "complete" that recursively calls itself and another helper
       // "loadTemplate" function until each template in the templateNames array is loaded 
       //into the template object "templateObj".
       function complete () {

            i += 1;

            if (i < templateNames.length) {
                //The loadTemplate function fetches each template asynchronously and augments the
                //templateObj when called.
                loadTemplate(templateObj, templateNames[i], complete);

            }
            else{

                callback();

            }
       }
        
       loadTemplate(templateObj, templateNames[i], complete);

    }
    
    /**
     * This function fetches an html template asynchronously and augments the
     * <code>templateObj</code>when called.
     * 
     * @param {object} templateObj The object in which the ajax response html 
     *                             data will be added.
     * @param {array} templateName An array of template names that indicate
     *                             each resource to load.
     * @param {function} callback  Function to call back after completion.
     */
    function loadTemplate(templateObj, templateName, callback){
        //Second helper function to loadTemplates.   
        $.get("../templates/" + templateName + ".html", function (content) {

            templateObj[templateName] = content;

            callback(content);
            
        });
    }
    
    /**
     * This function initializes this application.
     *
     */
    function initialize () {
     
      var contentObject = {},
          templateObject = {},
          dataUrlArray = ["content","contacts"],
          templateNameArray = ["main", "contacts"],
          iterator = 0;
  
   //Manages asynchronus requests needed to build the main landing page.
   //Several helper functions gather template content and json content needed to build
   //the IU and landing pages.
      loadData(iterator, contentObject, dataUrlArray, function (){
           
        loadTemplates(templateObject, templateNameArray, function (){

            buildAddressBookPage(contentObject.content, templateObject.main);

            buildContacts(contentObject.contacts, templateObject.contacts);
            
        });
           
      });
       
    }
       // start once ready
    
    initialize();
    
});
