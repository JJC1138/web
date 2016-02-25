import $ from 'jquery';

import './style.css';

import emailDeobfuscator from './email-deobfuscator.js';
import flickrBackgroundImage from './flickr-background-image.js';

$(document).ready(() => {
    emailDeobfuscator();
    flickrBackgroundImage();
});
