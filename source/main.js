import $ from 'jquery';
import WebFont from 'webfontloader';
import 'normalize.css';

import './style.css';

import emailDeobfuscator from './email-deobfuscator.js';
import flickrBackgroundImage from './flickr-background-image.js';

WebFont.load({ typekit: { id: 'kqf5olx' } });

$(document).ready(() => {
    emailDeobfuscator();
    flickrBackgroundImage(
        document.getElementById('background'),
        document.getElementById('photocredit'));
    
    {
        const infobox = $('#info');
        infobox.hide();
        infobox.fadeIn('slow');
    }
    $('h1,#showinfo').click(() => {
        $('#info').slideToggle();
        $('#showinfo').fadeToggle('slow');
    });
});
