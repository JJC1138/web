/* jshint eqeqeq: true, futurehostile: true, noarg: true, nocomma: true, strict: true, undef: true, unused: true */
/* global $, document, window */
$(document).ready(function() {
    'use strict';

    var infobox = $('#info');
    infobox.hide();
    infobox.fadeIn('slow');

    var photosetID = '72157628766778535';
    var pictureSizes = ['l', 'k']; // from smallest to largest
    var perSizeAttributes = ['url', 'width', 'height'];
    var urlAttributes = [];
    pictureSizes.forEach(function(size) {
        perSizeAttributes.forEach(function(perSizeAttribute) {
            urlAttributes.push(perSizeAttribute + '_' + size);
        });
    });
    var urlExtras = urlAttributes.join();

    $.ajax('https://api.flickr.com/services/rest/', {
        jsonp: 'jsoncallback',
        dataType: 'jsonp',
        cache: false,
        data: {
            api_key: 'baffdb3f3f3d6542c2905eb089ddf2ca',
            format: 'json',
            method: 'flickr.photosets.getPhotos',
            photoset_id: photosetID,
            user_id: '73022107@N00', // specifying the set owner like this gives better performance
            extras: urlExtras + ',path_alias'
        },
        success: function(data) {
            var photos = data.photoset.photo;
            var photo = photos[Math.floor(Math.random() * photos.length)];

            var photobox = $('#photocredit');
            if (photo.title) {
                photobox.html('<p>Photo: <a></a></p>');
            } else {
                photobox.html('<p><a>Photo</a></p>');
            }
            var a = photobox.find('a');
            a.attr('href',
                'https://www.flickr.com/photos/' +
                photo.pathalias + '/' + photo.id +
                '/in/set-' + photosetID + '/');
            if (photo.title) a.text(photo.title);

            var photoAspect = photo.width_l / photo.height_l;
            var screenAspect = window.screen.width / window.screen.height;
            var neededDimension;
            if (photoAspect > screenAspect) {
                neededDimension = 'height';
            } else {
                neededDimension = 'width';
            }

            var photoURL;
            for (var i = 0; i < pictureSizes.length; ++i) {
                var size = pictureSizes[i];
                
                var newPhotoURL = photo['url_' + size];
                if (!newPhotoURL) continue;
                
                photoURL = newPhotoURL;
                if (photo[neededDimension + '_' + size] >= window.screen[neededDimension]) {
                    // This photo can cover the whole screen.
                    break;
                }
            }

            $('<img>').attr('src', photoURL).load(function() {
                $('#background')
                    .css('background-image', "url('" + this.src + "')")
                    .fadeIn('fast', function() {
                        window.setTimeout(function() {
                            photobox.fadeIn('slow');
                        }, 500);
                    });
            });
        }
    });

    $('h1,#showinfo').click(function() {
        $('#info').slideToggle();
        $('#showinfo').fadeToggle('slow');
    });
});
