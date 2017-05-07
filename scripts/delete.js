
        
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

