function getContent () {

      var addressData = new XMLHttpRequest;
      addressData.open("GET", "../contacts.json", true);
      addressData.send();
}

function buildAddressBookPage () {

   var mainElement = document.createElement("main"),
       section1 = document.createElement("section"),
       section2 = document.createElement("section"),
       header = document.createElement("header"),
       ulElement = document.createElement("ul"),
       liElement = document.createElement("li"),
       h1Element = document.createElement("h1"),
       h3Element = document.createElement("h3"),
       figureElement = document.createElement("figure"),
       imgElement = document.createElement("img"),
       addressElement = document.createElement("address"),
       content = document.createTextNode("text");

    h3Element.appendChild.content();

}



function initialize () {
    
    getContent();
    buildAddressBookPage();


document.addEventListener("load", initialize, false);