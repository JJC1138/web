import $ from 'jquery';
import 'normalize.css';

import './style.css';

import emailDeobfuscator from './email-deobfuscator.js';
import flickrBackgroundImage from './flickr-background-image.js';

$(document).ready(() => {
    emailDeobfuscator();
    flickrBackgroundImage();
});
