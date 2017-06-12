$(function (){
   
    var contactMap = {};
     
    function buildContacts (data) {
        
       $.get('../templates/contacts.html', function (response){
           
           var contacts = Handlebars.compile(response);
           $(".contact-list").append(contacts(data));
           console.log(data);
           console.log(response);
           
       }); 
    }
    
    function buildAddressBookPage (data) {
        
       $.get('../templates/main.html', function (response){
           
           var mainPage = Handlebars.compile(response);
           $("body").append(mainPage(data));
           
       }); 
        
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


    function loadData(i, objArr, urlArray){
       //debugger; 
            
        $.getJSON(urlArray[i] + ".json", function (content) {

            objArr.push(content);

            i += 1;
            if (i < urlArray.length) {
                
                //console.log(objArr);

                loadData(i, objArr, urlArray);

            }
        });

    };
    
    function loadTemplates(i, templateArr, templateName){
       debugger; 
            
        $.get("../templates/" + templateName[i] + ".html", function (content) {

            templateArr.push(content);

            i += 1;
            
            if (i < templateName.length) {
                
                //console.log(objArr);

                loadTemplates(i, templateArr, templateName);

            }
        });

    };
    
    /**
     * 
     * Gathers template content, and json data content needed to build
     *  page from two async request.
     */

    function initialize () {
      var contentArray = [],
          templateArray = [],
          dataUrlArray = ["data/content","data/contacts"],
          templateNameArray = ["contacts", "main"],
          iterator = 0;
       loadData(iterator, contentArray, dataUrlArray);
 
       loadTemplates(iterator, templateArray, templateNameArray);
       console.log(contentArray);
       console.log(templateArray);
       //loadTemplates();
//        $.getJSON("data/content.json", function (content) {
//
//            $.getJSON("data/contacts.json", function (contacts) {
//
//                buildAddressBookPage(content);
//                buildContacts(contacts);
//
//            });
//
//       });

    }
    
    // start once ready
    
    initialize();
    
});
