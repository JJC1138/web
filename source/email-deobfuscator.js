export default () => {
    // This is based on:
    // http://pipwerks.com/2009/02/01/obfuscating-email-addresses-revisited/
    // by Philip Hutchison
    const events = ['click', 'contextmenu', 'focus', 'mouseover'];
    function addressCleaner() {
        /*eslint no-invalid-this: 0*/
        this.href = this.href.split('?')[0].replace('DELETE@THIS', '@');
        for (const event of events) this.removeEventListener(event, addressCleaner);
    }
    for (const element of [...document.querySelectorAll('a[href^="mailto:"]')]) { // conversion to Array is because NodeList is not yet directly iterable in all browsers (e.g. Chrome 48)
        for (const event of events) element.addEventListener(event, addressCleaner);
    }
}
