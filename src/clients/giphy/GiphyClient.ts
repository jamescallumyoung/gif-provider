///<reference path="../../../@types/giphy-api.d.ts" />

import { Maybe } from 'monet';
import { Gif } from "../../Gif";
import { SearchClient } from "../SearchClient";
import {convertResponseToGifs} from "./utils";

import giphyApi = require("giphy-api");
import {TrendingClient} from "../TrendingClient";

/**
 * The GiphyClient is a client for the Giphy Gif API, implementing the `Singleton` pattern,
 * and wrapping the internal `giphy-api` module.
 */
export class GiphyClient implements SearchClient, TrendingClient {

    private static instance: GiphyClient;
    private giphyApiInstance: GiphyApi;

    private constructor(
        apiKey: string
    ) {
        this.giphyApiInstance = giphyApi(apiKey);
    };

    public static init(apiKey: string): Maybe<GiphyClient> {
        if (!GiphyClient.instance) {
            GiphyClient.instance = new GiphyClient(apiKey);
        }

        return GiphyClient.getInstance();
    }

    public static getInstance(): Maybe<GiphyClient> {
        return Maybe.fromUndefined(GiphyClient.instance);
    }

    // --- Instance Methods ---

    public async search(query: string, limit: number = 30): Promise<Array<Gif>> {
        return this.giphyApiInstance.search({ "q": query, "limit": limit })
            .then(convertResponseToGifs)
            .catch( () => [] as Gif[] );
    }

    public async trending(limit: number = 30): Promise<Array<Gif>> {
        return this.giphyApiInstance.trending({ "limit": limit })
            .then(convertResponseToGifs)
            .catch( () => [] as Gif[] );
    }
}
