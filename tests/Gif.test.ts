import {expect} from 'chai';

import {Gif} from "../src";

describe('Gif', function() {

    describe('originalUrl', function () {

        // given
        const orig = "https://example.invalid/original.gif";
        const thumb = "https://example.invalid/thumbnail.gif";
        const gif = new Gif(orig, thumb);

        it('should be readable', function () {

            // when/then
            expect(gif.originalUrl).to.equal(orig);
        });
    });

    describe('thumbnailUrl', function () {

        // given
        const orig = "https://example.invalid/original.gif";
        const thumb = "https://example.invalid/thumbnail.gif";
        const gif = new Gif(orig, thumb);

        it('should be readable', function () {

            // when/then
            expect(gif.thumbnailUrl).to.equal(thumb);
        });
    });
});
