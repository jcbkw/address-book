/* global decodeURIComponent */

/**
 * Parses and decodes the current location's
 * query string into a JavaScript object.
 * 
 * @returns {Object}
 * @example
 * // say window.location is 'http://localhost/app?name=Ed+Ster&height=6'
 * 
 * console.dir(getQuery());
 * 
 * // outputs {name: "Ed Ster", height: "6"}
 */
function getQuery () {
    
    var obj = {};

    location.search.substring(1).split("&").forEach(function (w) {
        
        var parts = w.split("=");
        
        obj[urlDecode(parts[0])]= parts[1] ? urlDecode(parts[1]) : '';
        
    });
    
    return obj;
}

/**
 * Improves the decodeURIComponent by also supporting
 * pluses (+) and decoding them to space characters.
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
 * @param {String} value  The value to decode
 * @returns {String}      The decoded string
 */
function urlDecode (value) {
    
    return decodeURIComponent(value).split('+').join(' ');
    
}