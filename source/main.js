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
    flickrBackgroundImage({
        apiKey: 'baffdb3f3f3d6542c2905eb089ddf2ca',
        photosetID: '72157628766778535',
        ownerUserID: '73022107@N00',
        creditBox: document.getElementById('photocredit'),
    });

    const info = document.getElementById('info');
    const showInfo = document.getElementById('showinfo');

    $(info).hide();
    const toggleInfo = () => {
        $(info).slideToggle();
        $(showInfo).fadeToggle('slow');
    };
    for (const element of [document.querySelector('h1'), showInfo]) {
        element.addEventListener('click', toggleInfo);
    }

    if (fontsLoaded) fontLoadingDoneAndDocumentReady();
});

function fontLoadingDoneAndDocumentReady() {
    $(document.getElementById('info')).fadeIn('slow');
}
