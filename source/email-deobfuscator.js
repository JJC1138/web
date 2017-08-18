// This is based on:
// http://pipwerks.com/2009/02/01/obfuscating-email-addresses-revisited/
// by Philip Hutchison

const events = ['click', 'contextmenu', 'focus', 'mouseover'];

function cleanAddress() {
    /*eslint no-invalid-this: 0*/
    this.href = this.href.split('?')[0].replace('DELETE@THIS', '@');
    for (const event of events) this.removeEventListener(event, cleanAddress);
    const firstChild = this.firstChild;
    if (firstChild && firstChild.nodeType === Node.TEXT_NODE) {
        firstChild.nodeValue = firstChild.nodeValue.replace("[address]", this.href.replace("mailto:", ""));
    }
}

function addListenersToCleanAddressesOnInteraction() {
    for (const element of [...document.querySelectorAll('a[href^="mailto:"]')]) { // conversion to Array is because NodeList is not yet directly iterable in all browsers (e.g. Chrome 48)
        for (const event of events) element.addEventListener(event, cleanAddress);
    }
}

export { cleanAddress, addListenersToCleanAddressesOnInteraction };
export default addListenersToCleanAddressesOnInteraction;
