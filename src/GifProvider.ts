import {Gif} from "./Gif";

export interface GifProvider {

    /**
     * @param limit - The maximum number of results to return
     */
    trending: { (limit: Number): Promise<Gif[]> },

    /**
     * @param query - The search query
     * @param limit - The maximum number of results to return
     */
    search: { (query: string, limit: Number) : Promise<Gif[]> }
}
