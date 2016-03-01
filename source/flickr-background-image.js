import $ from 'jquery';

export default (photobox, background) => {
    if (!background) {
        background = document.createElement('div');
        const style = background.style;
        style.width = style.height = '100%';
        style.position = 'fixed';
        style.backgroundPosition = 'center';
        style.backgroundAttachment = 'fixed';
        style.backgroundRepeat = 'no-repeat';
        style.backgroundSize = 'cover';
        style.zIndex = -100;
        style.display = 'none';
        document.body.appendChild(background);
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

    // FUTURETODO Use URLSearchParams when it's available instead of $.param().
    fetch('https://api.flickr.com/services/rest/?' + $.param({
        api_key: 'baffdb3f3f3d6542c2905eb089ddf2ca',
        format: 'json',
        nojsoncallback: 1,
        method: 'flickr.photosets.getPhotos',
        photoset_id: photosetID,
        user_id: '73022107@N00', // specifying the set owner like this gives better performance
        extras: `${urlExtras},path_alias`,
    }), {
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        const photo = (() => {
            const photos = data.photoset.photo;
            return photos[Math.floor(Math.random() * photos.length)];
        })();

        if (photobox) {
            photobox.innerHTML = photo.title ?
                '<p>Photo: <a></a></p>' :
                '<p><a>Photo</a></p>';

            {
                const a = photobox.getElementsByTagName('a')[0];
                a.href = `https://www.flickr.com/photos/${photo.pathalias}/${photo.id}/in/set-${photosetID}/`;
                if (photo.title) a.textContent = photo.title;
            }
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

        {
            const img = document.createElement('img');
            img.addEventListener('load', function() {
                /*eslint no-invalid-this: 0*/
                background.style.backgroundImage = `url('${this.src}')`;

                $(background).fadeIn('fast', () => {
                    if (photobox) {
                        window.setTimeout(() => {
                            $(photobox).fadeIn('slow');
                        }, 500);
                    }
                });
            });
            img.src = photoURL;
        }
    }).catch(error => {
        console.log('Flickr API call failed', error);
    });
}
