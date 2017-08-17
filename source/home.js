import $ from 'jquery';
import 'normalize.css';

import './style.css';

import emailDeobfuscator from './email-deobfuscator.js';
import flickrBackgroundImage from './flickr-background-image.js';
import loadFonts from './load-fonts.js';

loadFonts(
    'kqf5olx',
    () => { $(document.getElementById('info')).hide(); },
    () => { $(document.getElementById('info')).fadeIn('slow'); }
);

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

    const toggleInfo = () => {
        $(info).slideToggle();
        $(showInfo).fadeToggle('slow');
    };
    for (const element of [document.querySelector('h1'), showInfo]) {
        element.addEventListener('click', toggleInfo);
    }
});
