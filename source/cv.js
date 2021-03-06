import $ from 'jquery';
import 'normalize.css';

import { cleanAddress, addListenersToCleanAddressesOnInteraction } from './email-deobfuscator.js';

$(() => {
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

    for (const img of document.querySelectorAll('#projects > ol > li img')) {
        img.alt = "Screenshot";
        const link = document.createElement('a');
        link.href = img.src;
        const imgParent = img.parentElement;
        imgParent.insertBefore(link, img);
        link.appendChild(img);
    }

    document.getElementById('experience-years').firstChild.nodeValue = new Date().getFullYear() - 2007;
});
