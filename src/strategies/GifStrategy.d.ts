import { Gif } from "../Gif";

export interface GifStrategy {
  readonly name: string;

  /**
   * Search the API for trending Gifs.
   * @param limit - The maximum number of results to return
   */
  trending: (limit: number) => Promise<Array<Gif>>;

  /**
   * Search the API for Gifs that match the query string.
   * @param query - The search query
   * @param limit - The maximum number of results to return
   */
  search: (query: string, limit: number) => Promise<Array<Gif>>;
}
