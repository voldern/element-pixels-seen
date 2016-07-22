module.exports = function elementPixelsSeen(element) {
    const rect = element.getBoundingClientRect();

    // IE8 does not have window.innerHeight
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const pixelsSeen = (element.offsetHeight - rect.bottom) + windowHeight;

    // No pixels have been seen yet
    if (pixelsSeen <= 0) {
        return 0;
    }

    return Math.min(pixelsSeen, element.offsetHeight);
};
