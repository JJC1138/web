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

    let info = document.getElementById('info');
    let showInfo = document.getElementById('showinfo');

    $(info).hide();
    let toggleInfo = () => {
        $(info).slideToggle();
        $(showInfo).fadeToggle('slow');
    };
    for (const element of [document.querySelector('h1'), showinfo]) {
        element.addEventListener('click', toggleInfo);
    }

    if (fontsLoaded) fontLoadingDoneAndDocumentReady();
});

function fontLoadingDoneAndDocumentReady() {
    $(document.getElementById('info')).fadeIn('slow');
}
