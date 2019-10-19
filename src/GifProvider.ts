import {Gif} from "./Gif";

interface trendingFn {
    /**
     * @param limit - The maximum number of results to return
     */
    (limit: Number): Promise<Gif[]>
}

interface searchFn {
    /**
     * @param query - The search query
     * @param limit - The maximum number of results to return
     */
    (query: string, limit: Number) : Promise<Gif[]>
}

export interface GifProvider {
    trending: trendingFn,
    search: searchFn
}
