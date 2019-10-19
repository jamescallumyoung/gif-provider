///<reference path="../../@types/giphy-api.d.ts" />

import {Gif} from "../Gif";
import {GifProvider} from "../GifProvider";

import giphyApi = require("giphy-api");

/**
 * GifProvider for the Giphy API
 */
export class GiphyGifProvider implements GifProvider {

    private readonly api: GiphyApi;

    /**
     * @param apiKey - The ApiKey to use for connecting to the Giphy API.
     */
    constructor(apiKey?: string) {
        this.api = giphyApi(apiKey);
    }

    _convertResponseToGifs(res: GiphyApiResponse): Gif[] {
        // @ts-ignore
        return res.data.map( (gif: any) : Gif => {
            try {
                return new Gif(gif.images.original.url, gif.images.fixed_width_small.url);
            }
            catch (e) {} // swallow any error and skip this gif
        } );
    }

    /**
     * List the trending gifs from the Giphy API.
     * Returns an empty list if there's an error in the request.
     *
     * @param limit - The maximum number of results to return
     */
    trending(limit: number = 30): Promise<Gif[]> {
        return this.api.trending({ "limit": limit })
            .then(this._convertResponseToGifs)
            .catch( () => [] as Gif[] );
    }

    /**
     * Search for gifs from the Giphy API
     * Returns an empty list if there are no matching results or an error in the request
     *
     * @param query - The query string
     * @param limit - The maximum number of results to return
     */
    search(query: string, limit: number = 30): Promise<Gif[]> {
        return this.api.search({ "q": query, "limit": limit })
            .then(this._convertResponseToGifs)
            .catch( () => [] as Gif[] );
    }

}
