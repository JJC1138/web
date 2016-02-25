'use strict';

var $ = require('jQuery');

module.exports = () => {
    // This is based on:
    // http://pipwerks.com/2009/02/01/obfuscating-email-addresses-revisited/
    // by Philip Hutchison
    var events = 'click contextmenu focus mouseover';
    function addressCleaner() {
        /*eslint no-invalid-this: 0*/
        this.href = this.href.split('?')[0].replace('DELETE@THIS', '@');
        $(this).unbind(events, addressCleaner);
    }
    $('a[href^="mailto:"]').bind(events, addressCleaner);
};
