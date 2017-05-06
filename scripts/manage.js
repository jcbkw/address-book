document.getElementById("newContact").addEventListener("submit", function(e){
    e.preventDefault();
    
    debugger;
    
    var xhr = new XMLHttpRequest(),
        form = this,
        items = form.querySelectorAll("input[name]"),
        payload =[],
        i;
    
    for (i = 0; i < items.length; i += 1 ){
        
        var item = items[i];
     
        payload.push(encodeURIComponent(item.name) + "=" + encodeURIComponent(item.value));
        
    }
    
    xhr.open("POST", location.pathname, true);
    //Send the proper header information along with the request to the backend. "When sending data to a server"
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(payload.join("&"));
    
    alert("submitted");
    
} ,false);

