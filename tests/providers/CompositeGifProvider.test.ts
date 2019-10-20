import {expect} from 'chai';
import sinon = require('sinon');

import {CompositeGifProvider, Gif, GiphyGifProvider} from "../../src";

describe('CompositeGifProvider', function () {

    // sinon stuff...

    let sandbox: sinon.SinonSandbox;

    beforeEach( function createSinonNewSandboxBeforeEach() {
        sandbox = sinon.createSandbox();
    } );

    afterEach( function restoreSinonSandboxAfterEach() {
        sandbox.restore();
    } );

    // All network calls are blocked by nock so we don't need to worry about them here

    describe('trending', function () {

        it('should call the trending method on each of it\'s wrapped GifProviders (once each)', async function () {

            // given
            const giphyGifProvider = new GiphyGifProvider();
            const giphyTrendingStub = sandbox.stub(giphyGifProvider, 'trending')
                .callsFake( async function(limit?: number) {
                    return [ new Gif("foo", "bar") ];
                } );

            const otherGifProvider = new GiphyGifProvider();
            const otherTrendingStub = sandbox.stub(otherGifProvider, 'trending')
                .callsFake( async function(limit?: number) {
                    return [ new Gif("foo", "bar") ];
                } );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            await compositeGifProvider.trending();

            // then

            expect(giphyTrendingStub.calledOnce);
            expect(otherTrendingStub.calledOnce);
        });

        it('should aggregate the results of each wrapped GifProvider', async function () {

            // given
            const giphyResponse: Gif[] = [
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar")
            ];

            const otherResponse: Gif[] = [
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar")
            ];

            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'trending')
                .callsFake( async (limit?: number) => {
                    return giphyResponse;
                } );

            sandbox.stub(otherGifProvider, 'trending')
                .callsFake( async (limit?: number) => {
                    return otherResponse;
                } );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            const r = await compositeGifProvider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(giphyResponse.length + otherResponse.length);
            expect(r).to.deep.include.members([...giphyResponse, ...otherResponse]);
        });

        it('still aggregates the results if some of the wrapped GifProviders return an empty array', async function () {

            // given
            const giphyResponse: Gif[] = [
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar")
            ];

            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'trending')
                .callsFake( async (limit?: number) => {
                    return giphyResponse;
                } );

            sandbox.stub(otherGifProvider, 'trending')
                .callsFake( async (limit?: number) => [] );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            const r = await compositeGifProvider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(giphyResponse.length);
            expect(r).to.deep.include.members([...giphyResponse]);
        });

        it('returns an empty array if all of the wrapped GifProviders return an empty array', async function() {

            // given
            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'trending')
                .callsFake( async (limit?: number) => [] );

            sandbox.stub(otherGifProvider, 'trending')
                .callsFake( async (limit?: number) => [] );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            const r = await compositeGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('returns the first N results if the wrapped GifProviders provide more than \'limit\' results', async function () {

            // given
            const giphyResponse: Gif[] = [
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar")
            ];

            const otherResponse: Gif[] = [
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar")
            ];

            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'trending')
                .callsFake( async (limit?: number) => {
                    return giphyResponse;
                } );

            sandbox.stub(otherGifProvider, 'trending')
                .callsFake( async (limit?: number) => {
                    return otherResponse;
                } );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            const limit = 5;

            // when
            const r = await compositeGifProvider.trending(limit);

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(5);
            expect(r).to.deep.include.members([ ...giphyResponse .slice(0, limit)]);
        });
    });

    describe('search', function () {

        it('should call the search method on each of it\'s wrapped GifProviders (once each)', async function () {

            // given
            const giphyGifProvider = new GiphyGifProvider();
            const giphySearchStub = sandbox.stub(giphyGifProvider, 'search')
                .callsFake( async function(query: string, limit?: number) {
                    return [ new Gif("foo", "bar") ];
                } );

            const otherGifProvider = new GiphyGifProvider();
            const otherSearchStub = sandbox.stub(otherGifProvider, 'search')
                .callsFake( async function(query: string, limit?: number) {
                    return [ new Gif("foo", "bar") ];
                } );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            await compositeGifProvider.search("superman");

            // then

            expect(giphySearchStub.calledOnce);
            expect(otherSearchStub.calledOnce);
        });

        it('should aggregate the results of each wrapped GifProvider', async function () {

            // given
            const giphyResponse: Gif[] = [
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar")
            ];

            const otherResponse: Gif[] = [
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar")
            ];

            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'search')
                .callsFake( async function(query: string, limit?: number) {
                    return giphyResponse;
                } );

            sandbox.stub(otherGifProvider, 'search')
                .callsFake( async function(query: string, limit?: number) {
                    return otherResponse;
                } );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            const r = await compositeGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(giphyResponse.length + otherResponse.length);
            expect(r).to.deep.include.members([...giphyResponse, ...otherResponse]);
        });

        it('still aggregates the results if some of the wrapped GifProviders return an empty array', async function() {

            // given
            const giphyResponse: Gif[] = [
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar")
            ];

            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'search')
                .callsFake( async function(query: string, limit?: number) {
                    return giphyResponse;
                } );

            sandbox.stub(otherGifProvider, 'search')
                .callsFake( async (query: string, limit?: number) => [] );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            const r = await compositeGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(giphyResponse.length);
            expect(r).to.deep.include.members([...giphyResponse]);
        });

        it('returns an empty array if all of the wrapped GifProviders return an empty array', async function() {

            // given
            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'search')
                .callsFake( async (query: string, limit?: number) => [] );

            sandbox.stub(otherGifProvider, 'search')
                .callsFake( async (query: string, limit?: number) => [] );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            // when
            const r = await compositeGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('returns the first N results if the wrapped GifProviders provide more than \'limit\' results', async function () {

            // given
            const giphyResponse: Gif[] = [
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar"),
                new Gif("goo", "bar")
            ];

            const otherResponse: Gif[] = [
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar"),
                new Gif("ooo", "bar")
            ];

            const giphyGifProvider = new GiphyGifProvider();
            const otherGifProvider = new GiphyGifProvider();

            sandbox.stub(giphyGifProvider, 'search')
                .callsFake( async (query: string, limit?: number) => {
                    return giphyResponse;
                } );

            sandbox.stub(otherGifProvider, 'search')
                .callsFake( async (query: string, limit?: number) => {
                    return otherResponse;
                } );

            const compositeGifProvider = new CompositeGifProvider([ giphyGifProvider, otherGifProvider ]);

            const limit = 5;

            // when
            const r = await compositeGifProvider.search("superman", limit);

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(5);
            expect(r).to.deep.include.members([ ...giphyResponse .slice(0, limit)]);
        });
    });
});
