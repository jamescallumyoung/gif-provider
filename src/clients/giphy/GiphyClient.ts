import { Maybe } from "monet";
import { Gif } from "../../Gif";
import { convertResponseToGifs } from "./utils";

const giphyApi = require("giphy-api"); // eslint-disable-line @typescript-eslint/no-var-requires

/**
 * The GiphyClient is a client for the Giphy Gif API, implementing the `Singleton` pattern,
 * and wrapping the internal `giphy-api` module.
 */
export class GiphyClient {
  private static instance: GiphyClient;
  private giphyApiInstance: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  private constructor(apiKey: string) {
    this.giphyApiInstance = giphyApi(apiKey);
  }

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

  public async search(query: string, limit = 30): Promise<Array<Gif>> {
    return this.giphyApiInstance
      .search({ q: query, limit: limit })
      .then(convertResponseToGifs)
      .catch(() => [] as Gif[]);
  }

  public async trending(limit = 30): Promise<Array<Gif>> {
    return this.giphyApiInstance
      .trending({ limit: limit })
      .then(convertResponseToGifs)
      .catch(() => [] as Gif[]);
  }
}
