import $ from 'jquery';
import WebFont from 'webfontloader';
import 'normalize.css';

import './style.css';

import emailDeobfuscator from './email-deobfuscator.js';
import flickrBackgroundImage from './flickr-background-image.js';

let fontsLoaded = false;

function fontLoadingDone() {
    fontsLoaded = true;
    if (document.readyState !== 'loading') fontLoadingDoneAndDocumentReady();
}

WebFont.load({
    typekit: { id: 'kqf5olx' },
    active: fontLoadingDone,
    inactive: fontLoadingDone,
});

$(document).ready(() => {
    emailDeobfuscator();
    flickrBackgroundImage(document.getElementById('photocredit'));
    
    $('#info').hide();
    $('h1,#showinfo').click(() => {
        $('#info').slideToggle();
        $('#showinfo').fadeToggle('slow');
    });

    if (fontsLoaded) fontLoadingDoneAndDocumentReady();
});

function fontLoadingDoneAndDocumentReady() {
    $('#info').fadeIn('slow');
}
