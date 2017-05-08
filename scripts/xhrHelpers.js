function postParameters (url, params, callback) {
        
    var xhr = new XMLHttpRequest(),
        payload;

    xhr.open("POST", url, /*async*/true);

    xhr.addEventListener("load", function (event) {

        callback && callback.call(xhr, /*no error*/null, event.responseText);

    });

    xhr.addEventListener("error", function (error) {

        callback && callback.call(xhr, error);

    });

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if (params) {

        payload = [];

        for (var i in params) {

            if (params.hasOwnProperty(i)) {

                payload.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));

            }

        }

        xhr.send(payload.join("&"));        

    }
    else {

        xhr.send();        

    }

    return xhr;

}

function getText (url, params, callback) {
        
    var xhr = new XMLHttpRequest(),
        payload;


    xhr.addEventListener("load", function (event) {

        callback && callback.call(xhr, /*no error*/null, event.responseText);

    });

    xhr.addEventListener("error", function (error) {

        callback && callback.call(xhr, error);

    });
    
    if (params) {

        payload = [];

        for (var i in params) {

            if (params.hasOwnProperty(i)) {

                payload.push(encodeURIComponent(i) + "=" + encodeURIComponent(params[i]));

            }

        }

        url += '?' + payload.join("&");

    }

    xhr.open("GET", url, /*async*/true);
    xhr.send();        
    
    return xhr;

}

function getJson (url, params, callback) {
    
    getText(url, params, function (error, text) {
        
        if (error) {
            
            callback && callback.call(this, error);
            
            return;
                        
        }
        
        try {

            var parsedData = JSON.parse(text);
            
            callback && callback.call(this, /*no error*/null, parsedData);

        }
        catch (e) {

            callback && callback.call(this, e);

        }
        
    });
        
}