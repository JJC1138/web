import $ from 'jquery';
import 'normalize.css';

import { cleanAddress, addListenersToCleanAddressesOnInteraction } from './email-deobfuscator.js';

$(document).ready(() => {
    addListenersToCleanAddressesOnInteraction();
    cleanAddress.bind(document.getElementById('email'))();

    for (const element of document.querySelectorAll('a')) {
        if (!element.firstChild) {
            let linkText = element.href;
            linkText = linkText.replace(/^https?:\/\//, "");
            linkText = linkText.replace(/^mailto:/, "");
            linkText = linkText.replace(/\.com\/$/, ".com"); // Remove trailing slash if the URL is just a domain.
            element.appendChild(document.createTextNode(linkText));
        }
    }
});
