import { Maybe } from "monet";
import { Gif } from "../../Gif";
import rp, { Options as RequestOptions } from "request-promise";
import { convertResponseIntoGifs } from "./utils";


/**
 * The GfycatClient is a client for the Gfycat Gif API, implementing the `Singleton` pattern,
 * and retrieving data via HTTP requests to the Gfycat API.
 */
export class GfycatClient {
  private readonly baseUrl: string = "https://api.gfycat.com/v1";
  private static instance: GfycatClient;

  private constructor(private readonly authToken?: string) {}

  public static init(authToken?: string): Maybe<GfycatClient> {
    if (!GfycatClient.instance) {
      GfycatClient.instance = new GfycatClient(authToken);
    }

    return GfycatClient.getInstance();
  }

  public static getInstance(): Maybe<GfycatClient> {
    return Maybe.fromUndefined(GfycatClient.instance);
  }

  // --- Instance Methods ---

  public async search(query: string, limit = 30): Promise<Array<Gif>> {
    const reqOpts: RequestOptions = {
      uri: `${this.baseUrl}/gfycats/search`,
      qs: {
        search_text: query,
        gcyCount: limit,
      },
      json: true,
    };

    if (this.authToken) {
      reqOpts.headers = { Authorization: `Bearer ${this.authToken}` };
    }

    return rp(reqOpts)
      .then(convertResponseIntoGifs)
      .catch(() => [] as Gif[]);
  }

  public async trending(limit = 30): Promise<Array<Gif>> {
    const reqOpts: RequestOptions = {
      uri: `${this.baseUrl}/reactions/populated`,
      qs: {
        tagName: "trending",
        gcyCount: limit,
      },
      json: true,
    };

    if (this.authToken) {
      reqOpts.headers = { Authorization: `Bearer ${this.authToken}` };
    }

    return rp(reqOpts)
      .then(convertResponseIntoGifs)
      .catch(() => [] as Gif[]);
  }
}
