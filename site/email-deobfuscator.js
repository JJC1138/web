/* jshint eqeqeq: true, futurehostile: true, noarg: true, nocomma: true, strict: true, undef: true, unused: true */
/* global $, document */
$(document).ready(function() {
    // This is based on:
    // http://pipwerks.com/2009/02/01/obfuscating-email-addresses-revisited/
    // by Philip Hutchison
    'use strict';
    var events = 'click contextmenu focus mouseover';
    function addressCleaner() {
        /* jshint validthis: true */
        this.href = this.href.split('?')[0].replace('DELETE@THIS', '@');
        $(this).unbind(events, addressCleaner);
    }
    $('a[href^="mailto:"]').bind(events, addressCleaner);
});
