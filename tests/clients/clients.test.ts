import { TenorApiResponse } from "../../src/clients/tenor/tenor-api";

import { expect } from "chai";
import { GiphyClient, TenorClient, GfycatClient } from "../../src";

import nock = require("nock");

// @ts-ignore
import tenorTrendingSuccessResponseFixture from "./fixtures/tenor-trending-success-response.json";
// @ts-ignore
import tenorSearchSuccessResponseFixture from "./fixtures/tenor-search-success-response.json";
// @ts-ignore
import tenorBadAuthResponseFixture from "./fixtures/tenor-bad-auth-response.json";
// @ts-ignore
import giphyTrendingSuccessResponseFixture from "./fixtures/giphy-trending-success-response.json";
// @ts-ignore
import giphySearchSuccessResponseFixture from "./fixtures/giphy-search-success-response.json";
// @ts-ignore
import giphyBadAuthResponseFixture from "./fixtures/giphy-bad-auth-response.json";
// @ts-ignore
import gfycatTrendingSuccessResponseFixture from "./fixtures/gfycat-trending-success-response.json";
// @ts-ignore
import gfycatSearchSuccessResponseFixture from "./fixtures/gfycat-search-success-response.json";
// @ts-ignore
import gfycatBadAuthResponseFixture from "./fixtures/gfycat-bad-auth-response.json";

type ClientType = GiphyClient | TenorClient | GfycatClient;

const clientConfigs = [
  {
    name: "tenor",
    url: "https://api.tenor.com/",
    searchPath: "/v1/search",
    trendingPath: "/v1/trending",
    searchSuccessReponseFixture: tenorSearchSuccessResponseFixture,
    trendingSuccessReponseFixture: tenorTrendingSuccessResponseFixture,
    badAuthReponseFixture: tenorBadAuthResponseFixture,
    client: TenorClient,
  },
  {
    name: "giphy",
    url: "http://api.giphy.com",
    searchPath: "/v1/gifs/search",
    trendingPath: "/v1/gifs/trending",
    searchSuccessReponseFixture: giphySearchSuccessResponseFixture,
    trendingSuccessReponseFixture: giphyTrendingSuccessResponseFixture,
    badAuthReponseFixture: giphyBadAuthResponseFixture,
    client: GiphyClient,
  },
  {
    name: "gfycat",
    url: "https://api.gfycat.com/v1",
    searchPath: "/gfycats/search",
    trendingPath: "/reactions/populated",
    searchSuccessReponseFixture: gfycatSearchSuccessResponseFixture,
    trendingSuccessReponseFixture: gfycatTrendingSuccessResponseFixture,
    badAuthReponseFixture: gfycatBadAuthResponseFixture,
    client: GfycatClient,
  },
];

/*
 * N.B. These tests can be looped over because the Tenor and Giphy clients expose the same interfaces.
 *      This is not guaranteed for other clients so their test suites may need to be separate. If any
 *      large changes are made to the Tenor or Giphy APIs or Clients, they may also need to be separated.
 */

describe("[clients]", () => {
  for (const clientConfig of clientConfigs) {
    describe(clientConfig.name, function () {
      const endpoints = [
        /*
         * name is a human readable name to display in the test output
         * fn is a wrapper for the client fn - needed for the test loop
         * path is the path on the API to mock
         * successFixture is the mocked fixture used by the successful response test
         */
        {
          name: "search",
          fn: (client: ClientType) => () => client.search("superman"),
          path: clientConfig.searchPath,
          successFixture: clientConfig.searchSuccessReponseFixture,
        },
        {
          name: "trending",
          fn: (client: ClientType) => () => client.trending(),
          path: clientConfig.trendingPath,
          successFixture: clientConfig.trendingSuccessReponseFixture,
        },
      ];

      for (const endpoint of endpoints) {
        describe(`${endpoint.name}`, function () {
          const client = clientConfig.client.init("fake-api-key").some();

          it(`should call the ${clientConfig.name} API`, async function () {
            this.timeout(5000); // increase test timeout as the API can be slow

            // given
            const scope = nock(clientConfig.url)
              .get(endpoint.path)
              .query(true)
              .reply(200, {}); // response doesn't matter

            const fn = endpoint.fn(client);

            // when
            await fn();

            // then
            expect(scope.isDone()).to.equal(
              true,
              `Nock was not called for '${endpoint.name}'`
            );
          });

          it("should return an empty array when the API key is rejected", async function () {
            this.timeout(5000); // increase test timeout as the API can be slow

            // given
            nock(clientConfig.url)
              .get(endpoint.path)
              .query(true)
              .reply(200, clientConfig.badAuthReponseFixture);

            const fn = endpoint.fn(client);

            // when
            const r = await fn();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
          });

          it("should return an empty array when the API returns 4xx/5xx", async function () {
            this.timeout(5000); // increase test timeout as the API can be slow

            // given
            nock(clientConfig.url)
              .get(endpoint.path)
              .query(true)
              .reply(500, {});

            const fn = endpoint.fn(client);

            // when
            const r = await fn();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
          });

          it("should return an empty array when there are no results", async function () {
            this.timeout(5000); // increase test timeout as the API can be slow

            // given
            const emptyDataResponse: TenorApiResponse = {
              next: "fhyr7e8usd",
              results: [],
            };

            // given
            nock(clientConfig.url)
              .get(endpoint.path)
              .query(true)
              .reply(200, emptyDataResponse);

            const fn = endpoint.fn(client);

            // when
            const r = await fn();

            // then
            expect(r).to.be.an("Array");
            expect(r).to.have.lengthOf(0);
          });

          it("should return an array of Gifs when there are results", async function () {
            this.timeout(5000); // increase test timeout as the API can be slow

            // given
            nock(clientConfig.url)
              .get(endpoint.path)
              .query(true)
              .reply(200, endpoint.successFixture);

            const fn = endpoint.fn(client);

            // when
            const r = await fn();

            // then
            expect(r).to.be.an("Array");
            // expect(r).to.have.lengthOf(endpoint.successFixture.results.length);

            expect(r[0]).to.have.property("originalUrl");
            expect(r[0].originalUrl).to.not.equal(
              undefined,
              "Gif.originalUrl is undefined"
            );
            expect(r[0].originalUrl).to.not.equal(
              "",
              "Gif.originalUrl is an empty string"
            );
            expect(r[0]).to.have.property("thumbnailUrl");
            expect(r[0].thumbnailUrl).to.not.equal(
              undefined,
              "Gif.thumbnailUrl is undefined"
            );
            expect(r[0].thumbnailUrl).to.not.equal(
              "",
              "Gif.thumbnailUrl is an empty string"
            );
          });
        });
      }
    });
  }
});
