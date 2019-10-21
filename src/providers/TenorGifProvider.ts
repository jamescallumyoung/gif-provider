///<reference path="../../@types/tenor-api.d.ts" />
import {TenorApiResponse, TenorGifResult} from "../../@types/tenor-api";

import {Gif} from "../Gif";
import {GifProvider} from "../GifProvider";

import rp from 'request-promise';

/**
 * GifProvider for the Tenor API
 */
export class TenorGifProvider implements GifProvider {

    private apiKey: string;

    /**
     * @param apiKey - The ApiKey to use for connecting to the Tenor API.
     */
    constructor(apiKey: string = "EINAA502M6UN") {
        this.apiKey = apiKey;
    }

    private convertResponseToGifs(res: TenorApiResponse): Gif[] {

        if(!res || !res.results) return [];

        // @ts-ignore
        return res.results.map( (result: TenorGifResult) : Gif => {
            try {
                return new Gif(result.media[0].gif.url, result.media[0].tinygif.url);
            }
            catch (e) {} // swallow any error and skip this gif
        } );
    }

    /**
     * List the trending gifs from the Tenor API.
     *
     * @param limit - The maximum number of results to return
     * @returns an empty list if there's an error in the request.
     */
    async trending(limit: number = 30): Promise<Gif[]> {
        return rp({
            uri: 'https://api.tenor.com/v1/trending',
            qs: {
                key: this.apiKey,
                locale: "en_US",
                media_filter: "minimal",
                limit: limit
            },
            json: true
        })
            .then(this.convertResponseToGifs)
            .catch( () => [] as Gif[] );
    }

    /**
     * Search for gifs from the Tenor API
     *
     * @param query - The query string
     * @param limit - The maximum number of results to return
     * @returns an empty list if there are no matching results or an error in the request
     */
    async search(query: string, limit: number = 30): Promise<Gif[]> {
        return rp({
            uri: 'https://api.tenor.com/v1/search',
            qs: {
                key: this.apiKey,
                q: query,
                locale: "en_US",
                media_filter: "minimal",
                limit: limit
            },
            json: true
        })
            .then(this.convertResponseToGifs)
            .catch( () => [] as Gif[] );
    }

}
