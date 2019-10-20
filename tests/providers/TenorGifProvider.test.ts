import {TenorApiResponse} from "../../@types/tenor-api";

import nock = require("nock");
import {expect} from 'chai';

import {TenorGifProvider} from "../../src";

// @ts-ignore
import tenorTrendingSuccessResponseFixture from './fixtures/tenor-trending-success-response.json';
// @ts-ignore
import tenorSearchSuccessResponseFixture from './fixtures/tenor-search-success-response.json';
// @ts-ignore
import tenorBadAuthResponse from './fixtures/tenor-bad-auth-response.json';

describe('TenorGifProvider', function () {

    describe('trending', function () {

        it('should call the tenor API', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const scope = nock('https://api.tenor.com')
                .get('/v1/trending')
                .query(true)
                .reply(200, { "foo":"bar" }); // response doesn't matter

            const tenorGifProvider = new TenorGifProvider();

            // when
            await tenorGifProvider.trending();

            // then
            expect(scope.isDone()).to.equal(true, "nock for /trending was not called");
        });

        it('should return an empty array when the API key is rejected', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('https://api.tenor.com')
                .get('/v1/trending')
                .query(true)
                .reply(200, tenorBadAuthResponse);

            const provider = new TenorGifProvider("bad_key");

            // when
            const r = await provider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when the API returns 4xx/5xx', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('https://api.tenor.com')
                .get('/v1/trending')
                .query(true)
                .reply(500, {});

            const provider = new TenorGifProvider();

            // when
            const r = await provider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when there are no results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const emptyDataResponse: TenorApiResponse = {
                next: "foobar",
                results: []
            };

            nock('https://api.tenor.com')
                .get('/v1/trending')
                .query(true)
                .reply(200, emptyDataResponse);

            const provider = new TenorGifProvider();

            // when
            const r = await provider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an array of Gifs when there are results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('https://api.tenor.com')
                .get('/v1/trending')
                .query(true)
                .reply(200, tenorTrendingSuccessResponseFixture);

            const provider = new TenorGifProvider();

            // when
            const r = await provider.trending();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(tenorTrendingSuccessResponseFixture.results.length);

            expect(r[0]).to.have.property("originalUrl");
            expect(r[0]).to.have.property("thumbnailUrl");
        });

        it('should honour the length argument', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const limit = 5;

            const limittedResponse: TenorApiResponse = {
                next: "foobar",
                results: tenorTrendingSuccessResponseFixture.results.slice(0, limit)
            };

            nock('https://api.tenor.com')
                .get('/v1/trending')
                .query(true)
                .reply(200, limittedResponse);

            const provider = new TenorGifProvider();

            // when
            const r = await provider.trending(limit);

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(limit);
        });
    });

    describe('search', function () {

        it('should call the giphy API', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const scope = nock('https://api.tenor.com/')
                .get('/v1/search')
                .query(true)
                .reply(200, {}); // response doesn't matter

            const provider = new TenorGifProvider();

            // when
            await provider.search("superman");

            // then
            expect(scope.isDone()).to.equal(true, "nock for /trending was not called");
        });

        it('should return an empty array when the API key is rejected', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('https://api.tenor.com/')
                .get('/v1/search')
                .query(true)
                .reply(200, tenorBadAuthResponse);

            const provider = new TenorGifProvider("bad_key_3e3wer");

            // when
            const r = await provider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when the API returns 4xx/5xx', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('https://api.tenor.com')
                .get('/v1/search')
                .query(true)
                .reply(500, {});

            const provider = new TenorGifProvider();

            // when
            const r = await provider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an empty array when there are no results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const emptyDataResponse: TenorApiResponse = {
                next: "fhyr7e8usd",
                results: []
            };

            nock('https://api.tenor.com')
                .get('/v1/search')
                .query(true)
                .reply(200, emptyDataResponse);

            const provider = new TenorGifProvider();

            // when
            const r = await provider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
        });

        it('should return an array of Gifs when there are results', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            nock('https://api.tenor.com')
                .get('/v1/search')
                .query(true)
                .reply(200, tenorSearchSuccessResponseFixture);

            const provider = new TenorGifProvider();

            // when
            const r = await provider.search("superman");

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(tenorSearchSuccessResponseFixture.results.length);

            expect(r[0]).to.have.property("originalUrl");
            expect(r[0]).to.have.property("thumbnailUrl");
        });

        it('should honour the length argument', async function () {

            this.timeout(5000); // increase test timeout as /trending can be slow

            // given
            const limit = 5;

            const limittedResponse: TenorApiResponse = {
                next: "fhyr7e8usd",
                results: tenorSearchSuccessResponseFixture.results.slice(0, limit)
            };

            nock('https://api.tenor.com')
                .get('/v1/search')
                .query(true)
                .reply(200, limittedResponse);

            const provider = new TenorGifProvider();

            // when
            const r = await provider.search("superman", limit);

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(limit);
        });
    });
});
