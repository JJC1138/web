/* jshint eqeqeq: true, futurehostile: true, noarg: true, nocomma: true, globalstrict: true, undef: true, unused: true */
/* global require, document */

'use strict';

var $ = require('jQuery');

$(document).ready(function() {
    require('./email-deobfuscator.js')();
    require('./flickr-background-image.js')();
});
