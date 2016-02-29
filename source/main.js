import $ from 'jquery';
import WebFont from 'webfontloader';
import 'normalize.css';

import './style.css';

import emailDeobfuscator from './email-deobfuscator.js';
import flickrBackgroundImage from './flickr-background-image.js';

WebFont.load({ typekit: { id: 'kqf5olx' } });

$(document).ready(() => {
    emailDeobfuscator();
    flickrBackgroundImage();
});
