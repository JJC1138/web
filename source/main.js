'use strict';

const $ = require('jQuery');

$(document).ready(() => {
    require("./style.css");
    require('./email-deobfuscator.js')();
    require('./flickr-background-image.js')();
});
