import {expect} from 'chai';

import {GifProviderFactory} from "../src";

describe('GifProviderFactory', function() {

    describe('getProviders', function () {

        it('should return an empty array when given an empty array', function () {
            // given
            const search: string[] = [];

            // when/then
            expect(GifProviderFactory.getProviders(search)).to.be.an("array");
            expect(GifProviderFactory.getProviders(search)).to.have.lengthOf(0);
        });

        it('should return an empty array when no elements match', function () {
            // given
            const search: string[] = [ "foo", "bar", "baz" ];

            // when/then
            expect(GifProviderFactory.getProviders(search)).to.be.an("array");
            expect(GifProviderFactory.getProviders(search)).to.have.lengthOf(0);
        });

        it('should return an array of GifProviders when elements match', function () {
            // given
            const search: string[] = [ "giphy", "foo", "bar" ];

            // when/then
            expect(GifProviderFactory.getProviders(search)).to.be.an("array");
            expect(GifProviderFactory.getProviders(search)).to.have.lengthOf(1);
        });
    });
});
