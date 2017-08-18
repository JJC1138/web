import $ from 'jquery';
import 'normalize.css';

import { cleanAddress, addListenersToCleanAddressesOnInteraction } from './email-deobfuscator.js';
import loadFonts from './load-fonts.js';

loadFonts(
    'pnk2egk',
    () => {},
    () => { document.body.style.visibility = "visible"; }
);

$(document).ready(() => {
    addListenersToCleanAddressesOnInteraction();
    cleanAddress.bind(document.getElementById('email'))();
});
