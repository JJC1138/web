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

    for (const project of document.querySelectorAll('#projects > ol > li[data-minor]')) {
        const heading = project.querySelector('.heading');
        const toggle = document.createElement('div');
        toggle.classList.add('detail-toggle');

        const toggleDisclose = document.createElement('div');
        toggleDisclose.classList.add('detail-toggle-disclose');

        const toggleUndisclose = document.createElement('div');
        toggleUndisclose.classList.add('detail-toggle-undisclose');
        $(toggleUndisclose).fadeToggle(0);

        toggle.appendChild(toggleDisclose);
        toggle.appendChild(toggleUndisclose);

        heading.insertBefore(toggle, heading.firstChild);

        const details = project.querySelector('.details');
        toggle.addEventListener('click', () => {
            $(details).slideToggle();
            const toggleStateAnimationDuration = 175;
            $(toggleDisclose).fadeToggle(toggleStateAnimationDuration);
            $(toggleUndisclose).fadeToggle(toggleStateAnimationDuration);
        });

        $(details).slideToggle(0);
    }

    for (const img of document.querySelectorAll('#projects > ol > li img')) {
        img.alt = "Screenshot";
        const link = document.createElement('a');
        link.href = img.src;
        const imgParent = img.parentElement;
        imgParent.insertBefore(link, img);
        link.appendChild(img);
    }

    document.getElementById('experience-years').firstChild.nodeValue = new Date().getFullYear() - 2007
});
