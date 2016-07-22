/* eslint-disable func-names */
const pixelsSeen = require('../');

describe('Test', () => {
    beforeAll(function () {
        this.viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        document.querySelector('html').style.height = '100%';
        document.querySelector('body').style.height = '100%';

        this.elementHeight = this.viewportHeight * 2;

        this.element = document.createElement('div');
        this.element.style.width = '100px';
        this.element.style.height = `${this.elementHeight}px`;
        this.element.style.background = '#000';
        this.element.style.position = 'absolute';
        this.element.style.top = `${this.viewportHeight}px`;

        document.body.appendChild(this.element);

        // I couldn't get margins or paddings working in IE8 to get the
        // document height extended, so this dirty hack is needed
        const marginElement = document.createElement('div');
        marginElement.innerHTML = '&nbsp';
        marginElement.style.position = 'absolute';
        marginElement.style.top = `${(this.viewportHeight * 2) + this.elementHeight}px`;
        document.body.appendChild(marginElement);
    });

    beforeEach(() => {
        window.scrollTo(0, 0);
    });

    it('it should return 0 when item is not in view', function () {
        expect(pixelsSeen(this.element)).toBe(0);
    });

    it('should return total height when item is scrolled past', function () {
        window.scrollTo(0, this.viewportHeight + this.elementHeight);

        expect(pixelsSeen(this.element)).toBe(this.elementHeight);
    });

    it('should return number of seen pixels', function () {
        window.scrollTo(0, 20);
        expect(pixelsSeen(this.element)).toBe(20);

        window.scrollTo(0, this.viewportHeight + 10);
        expect(pixelsSeen(this.element)).toBe(this.viewportHeight + 10);
    });
});
