import $ from 'jquery';
import WebFont from 'webfontloader';
import 'normalize.css';

import emailDeobfuscator from './email-deobfuscator.js';

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

    $(document.body).hide();
    if (fontsLoaded) fontLoadingDoneAndDocumentReady();
});

function fontLoadingDoneAndDocumentReady() {
    $(document.body).show();
}
