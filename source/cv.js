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
        const toggleButtonStateClasses = ['detail-toggle-disclose', 'detail-toggle-undisclose'];
        toggle.classList.add('detail-toggle');
        toggle.classList.add(toggleButtonStateClasses[0]);
        heading.insertBefore(toggle, heading.firstChild);

        const details = project.querySelector('.details');
        toggle.addEventListener('click', () => {
            $(details).slideToggle();
            const desiredToggleClassIndex = toggle.classList.contains(toggleButtonStateClasses[0]) ? 1 : 0;
            toggle.classList.add(toggleButtonStateClasses[desiredToggleClassIndex]);
            toggle.classList.remove(toggleButtonStateClasses[1 - desiredToggleClassIndex]);
        });

        $(details).hide();
    }
});
