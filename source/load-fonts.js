import $ from 'jquery';
import WebFont from 'webfontloader';

export default (typekitID, onStart, onFontLoadingDoneAndDocumentReady) => {
    let fontsLoaded = false;

    function fontLoadingDone() {
        fontsLoaded = true;
        if (document.readyState !== 'loading') onFontLoadingDoneAndDocumentReady();
    }

    WebFont.load({
        typekit: { id: typekitID },
        active: fontLoadingDone,
        inactive: fontLoadingDone,
    });

    $(document).ready(() => {
        onStart();
        if (fontsLoaded) onFontLoadingDoneAndDocumentReady();
    });
}
