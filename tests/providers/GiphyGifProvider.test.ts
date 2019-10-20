import nock = require("nock");
import {expect} from 'chai';

import {GiphyGifProvider} from "../../src";

// @ts-ignore
import giphyTrendingSuccessResponseFixture from './fixtures/giphy-trending-success-response.json';
// @ts-ignore
import giphySearchSuccessResponseFixture from './fixtures/giphy-search-success-response.json';
// @ts-ignore
import giphyBadAuthResponse from './fixtures/giphy-bad-auth-response.json';

describe('GiphyGifProvider', function () {

    describe('trending', function () {

        it('should call the giphy API', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const scope = nock('http://api.giphy.com')
                .get('/v1/gifs/trending')
                .query(true)
                .reply(200, {}); // response doesn't matter

            const giphyGifProvider = new GiphyGifProvider();

            // when
            await giphyGifProvider.trending();

            // then
            expect(scope.isDone()).to.equal(true, "nock for /trending was not called");
        });

        it('should return an empty array when the API key is rejected', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('http://api.giphy.com')
                .get('/v1/gifs/trending')
                .query(true)
                .reply(200, giphyBadAuthResponse);

            const giphyGifProvider = new GiphyGifProvider("this_wont_work");

            // when
            const r = await giphyGifProvider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when the API returns 4xx/5xx', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('http://api.giphy.com')
                .get('/v1/gifs/trending')
                .query(true)
                .reply(500, {});

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when there are no results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const emptyDataResponse: any = {
                data: [],
                pagination: giphyTrendingSuccessResponseFixture.pagination,
                meta: giphyTrendingSuccessResponseFixture.meta
            };

            nock('http://api.giphy.com')
                .get('/v1/gifs/trending')
                .query(true)
                .reply(200, emptyDataResponse);

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an array of Gifs when there are results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('http://api.giphy.com')
                .get('/v1/gifs/trending')
                .query(true)
                .reply(200, giphyTrendingSuccessResponseFixture);

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(giphyTrendingSuccessResponseFixture.data.length);

            expect(r[0]).to.have.property("originalUrl");
            expect(r[0]).to.have.property("thumbnailUrl");
        });

        it('should honour the length argument', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const limit = 5;

            const limittedResponse: any = {
                data: giphyTrendingSuccessResponseFixture.data.slice(0, limit),
                pagination: giphyTrendingSuccessResponseFixture.pagination,
                meta: giphyTrendingSuccessResponseFixture.meta
            };

            nock('http://api.giphy.com')
                .get('/v1/gifs/trending')
                .query(true)
                .reply(200, limittedResponse);

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.trending(limit);

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(limit);
        });
    });

    describe('search', function () {

        it('should call the giphy API', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const scope = nock('http://api.giphy.com')
                .get('/v1/gifs/search')
                .query(true)
                .reply(200, {}); // response doesn't matter

            const giphyGifProvider = new GiphyGifProvider();

            // when
            await giphyGifProvider.search("superman");

            // then
            expect(scope.isDone()).to.equal(true, "nock for /trending was not called");
        });

        it('should return an empty array when the API key is rejected', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('http://api.giphy.com')
                .get('/v1/gifs/search')
                .query(true)
                .reply(200, giphyBadAuthResponse);

            const giphyGifProvider = new GiphyGifProvider("this_wont_work");

            // when
            const r = await giphyGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when the API returns 4xx/5xx', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('http://api.giphy.com')
                .get('/v1/gifs/search')
                .query(true)
                .reply(500, {});

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when there are no results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const emptyDataResponse: any = {
                data: [],
                pagination: giphySearchSuccessResponseFixture.pagination,
                meta: giphySearchSuccessResponseFixture.meta
            };

            nock('http://api.giphy.com')
                .get('/v1/gifs/search')
                .query(true)
                .reply(200, emptyDataResponse);

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an array of Gifs when there are results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('http://api.giphy.com')
                .get('/v1/gifs/search')
                .query(true)
                .reply(200, giphySearchSuccessResponseFixture);

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(giphySearchSuccessResponseFixture.data.length);

            expect(r[0]).to.have.property("originalUrl");
            expect(r[0]).to.have.property("thumbnailUrl");
        });

        it('should honour the length argument', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const limit = 5;

            const limittedResponse: any = {
                data: giphySearchSuccessResponseFixture.data.slice(0, limit),
                pagination: giphySearchSuccessResponseFixture.pagination,
                meta: giphySearchSuccessResponseFixture.meta
            };

            nock('http://api.giphy.com')
                .get('/v1/gifs/search')
                .query(true)
                .reply(200, limittedResponse);

            const giphyGifProvider = new GiphyGifProvider();

            // when
            const r = await giphyGifProvider.search("superman", limit);

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(limit);
        });
    });
});
