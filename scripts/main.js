/* global decodeURIComponent */

function getContent (url, callback) {

    var xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);

        xhr.addEventListener("load", function(e) {

            var parsedData;

            try {
                
                parsedData = JSON.parse(xhr.responseText);
                
            }
            catch (e) {

                parsedData = null;

            }

            callback(parsedData);

        }, false);

        xhr.send();

}

function urlDecode (value) {
    
    return decodeURIComponent(value).split('+').join(' ');
    
}

function getQuery () {
    
    var obj = {};

    location.search.substring(1).split("&").forEach(function (w) {
        
        var parts = w.split("=");
        
        obj[urlDecode(parts[0])]= parts[1] ? urlDecode(parts[1]) : '';
        
    });
    
    return obj;
}

function buildContacts (contacts, content) {

    var p = contacts.contactList,
        liElementCount = 0,
        ulElement = buildAddressBookPage(content.contactListName),
        addressElement,
        deleteElement,
        figureElement,
        editElement,
        imgElement,
        h3Element,
        liElement,
        aElement,
        criteria = getQuery().name;

    for (var i = 0; i < p.length; i += 1) {
  
      var content = [],
          contact = new Person (p[i]);
      if (criteria && !contact.matches(criteria)) {

            continue;
      }
          
        content.push (document.createTextNode(contact.name), 
                     document.createTextNode(contact.phone),
                     document.createTextNode(contact.getAddress().toString()));
                     
        liElementCount +=1;  //May use this to index as a unique identifier for contacts.           
        liElement = document.createElement("li");
        figureElement = document.createElement("figure");
        imgElement = document.createElement("img");
        h3Element = document.createElement("h3");
        aElement = document.createElement('a');
        addressElement = document.createElement("address");
        deleteElement = document.createElement("div");
        editElement = document.createElement("div");

        liElement.classList.add("row", "contact", "light-primary-color");
        liElement.setAttribute("contact-id", contact.id);
        figureElement.classList.add( "col", "img-wrapper");
        imgElement.classList.add( "avatar");
        imgElement.setAttribute("src", "images/people/" + contact.avatar);
        imgElement.setAttribute("alt", "avatar");
        h3Element.classList.add( "col", "contact-name");
        aElement.classList.add( "col", "contact-number");
        aElement.setAttribute("href", "tel:" + contact.phone);
        addressElement.classList.add( "col", "address");
        deleteElement.classList.add("fa", "fa-trash", "fa-lg", "delete-item");
        editElement.classList.add("fa", "fa-pencil", "fa-lg", "edit-item");

        figureElement.appendChild(imgElement);
        h3Element.appendChild(content[0]);
        aElement.appendChild(content[1]);
        addressElement.appendChild(content[2]);

        liElement.appendChild(figureElement); 
        liElement.appendChild(h3Element);
        liElement.appendChild(aElement);
        liElement.appendChild(addressElement);
        liElement.appendChild(deleteElement);
        liElement.appendChild(editElement);

        ulElement.appendChild(liElement);        
    }


}


function buildAddressBookPage (title) {

   var mainElement = document.createElement("main"),
       section1 = document.createElement("section"),
       section2 = document.createElement("section"),
       header = document.createElement("header"),
       h1Element = document.createElement("h1"),
       ulElement = document.createElement("ul"),
       aside = document.createElement("aside"),
       content = document.createTextNode(title);

       ulElement.classList.add( "table", "contact-list");
       mainElement.classList.add( "main-wrapper");
       section1.classList.add( "header-wrapper");
       section2.classList.add( "main-content");
       header.classList.add( "header", "text-primary-color", "divider-color",
                              "default-primary-color");
       
       h1Element.appendChild(content);
       header.appendChild(h1Element);
       section1.appendChild(header);
       section2.appendChild(ulElement);
       mainElement.appendChild(section1);
       mainElement.appendChild(section2);

       document.body.appendChild(mainElement);
       bindEvents(mainElement);
       return ulElement;
}

function bindEvents(mainElement){
    
    mainElement.addEventListener("click", handleItemClick, false);
      
}

function handleItemClick(e){
    
    if (e.target.classList.contains("edit-item")){
     
     //the edit button was clicked  
        
    }
    
    else if (e.target.classList.contains("delete-item")){
        
        //the delete button was clicked
        
        deleteContact(e.target);
        
    }
    
}

function initialize () {
    
   getContent("data/content.json", function (content) {

        getContent("data/contacts.json", function (contacts) {

            buildContacts(contacts, content || {contactListName: 'Derp'});

        });

   });


}
