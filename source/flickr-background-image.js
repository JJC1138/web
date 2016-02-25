'use strict';

const $ = require('jQuery');

module.exports = () => {
    {
        const infobox = $('#info');
        infobox.hide();
        infobox.fadeIn('slow');
    }

    const photosetID = '72157628766778535';
    const pictureSizes = ['l', 'k']; // from smallest to largest
    const urlExtras = (() => {
        const perSizeAttributes = ['url', 'width', 'height'];
        const urlAttributes = [];
        for (const size of pictureSizes) {
            for (const perSizeAttribute of perSizeAttributes) {
                urlAttributes.push(`${perSizeAttribute}_${size}`);
            }
        }
        return urlAttributes.join();
    })();

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
            extras: `${urlExtras},path_alias`
        },
        success: data => {
            const photo = (() => {
                const photos = data.photoset.photo;
                return photos[Math.floor(Math.random() * photos.length)];
            })();

            const photobox = $('#photocredit');

            if (photo.title) {
                photobox.html('<p>Photo: <a></a></p>');
            } else {
                photobox.html('<p><a>Photo</a></p>');
            }

            {
                const a = photobox.find('a');
                a.attr('href',
                    `https://www.flickr.com/photos/${photo.pathalias}/${photo.id}/in/set-${photosetID}/`);
                if (photo.title) a.text(photo.title);
            }

            const photoURL = (() => {
                const neededDimension = (() => {
                    const photoAspect = photo.width_l / photo.height_l;
                    const screenAspect = window.screen.width / window.screen.height;

                    return photoAspect > screenAspect ? 'height' : 'width';
                })();

                let photoURL;
                for (const size of pictureSizes) {
                    const newPhotoURL = photo[`url_${size}`];
                    if (!newPhotoURL) continue;

                    photoURL = newPhotoURL;
                    if (photo[`${neededDimension}_${size}`] >= window.screen[neededDimension]) {
                        // This photo can cover the whole screen.
                        break;
                    }
                }
                return photoURL;
            })();

            $('<img>').attr('src', photoURL).load(function() {
                /*eslint no-invalid-this: 0*/
                $('#background')
                    .css('background-image', `url('${this.src}')`)
                    .fadeIn('fast', () => {
                        window.setTimeout(() => {
                            photobox.fadeIn('slow');
                        }, 500);
                    });
            });
        }
    });

    $('h1,#showinfo').click(() => {
        $('#info').slideToggle();
        $('#showinfo').fadeToggle('slow');
    });
};
