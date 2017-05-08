/* global decodeURIComponent */

function getQuery () {
    
    var obj = {};

    location.search.substring(1).split("&").forEach(function (w) {
        
        var parts = w.split("=");
        
        obj[urlDecode(parts[0])]= parts[1] ? urlDecode(parts[1]) : '';
        
    });
    
    return obj;
}

function urlDecode (value) {
    
    return decodeURIComponent(value).split('+').join(' ');
    
}