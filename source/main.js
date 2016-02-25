import $ from 'jquery';

$(document).ready(() => {
    require("./style.css");
    require('./email-deobfuscator.js')();
    require('./flickr-background-image.js')();
});
