'use strict';

var $ = require('jQuery');

$(document).ready(function() {
    require("./style.css");
    require('./email-deobfuscator.js')();
    require('./flickr-background-image.js')();
});
