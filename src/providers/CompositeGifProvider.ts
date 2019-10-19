import * as Bluebird from 'bluebird';
import {flatten} from 'lodash'

import {GifProvider} from "../GifProvider";
import {Gif} from "../Gif";

export class CompositeGifProvider implements GifProvider {

    private providers: GifProvider[];

    /**
     * @param providers {Array<GifProvider>} - The providers to wrap
     * N.B. The order the providers are given will denote their order in search results.
     */
    constructor(providers: GifProvider[] = []) {
        this.providers = providers;
    }

    /**
     * Get a list of trending gifs from all wrapped providers.
     *
     * Returns an empty list if:
     * - none of the wrapped APIs support trending gifs
     * - they all return no results
     *
     * @param limit - The maximum number of results to return.
     */
    async trending(limit: number = 30) : Promise<Gif[]> {
        return Bluebird.map(this.providers, (provider) => provider.trending(limit) )
            .then( results  => flatten(results) );
    }

    /**
     * Search for gifs that match the query string from all wrapped providers.
     *
     * * Returns an empty list if:
     * - none of the wrapped APIs support searching for gifs
     * - they all return no results
     *
     * @param query - The search query.
     * @param limit  - The maximum number of results to return.
     */
    async search(query: string, limit: number = 30) {
        return Bluebird.map(this.providers, (provider) => provider.search(query, limit) )
            .then( (results) => flatten(results) );
    }
}
