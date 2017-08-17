import $ from 'jquery';
import 'normalize.css';

import emailDeobfuscator from './email-deobfuscator.js';
import loadFonts from './load-fonts.js';

loadFonts(
    'pnk2egk',
    () => {},
    () => { document.body.style.visibility = "visible"; }
);

$(document).ready(() => {
    emailDeobfuscator();
});
