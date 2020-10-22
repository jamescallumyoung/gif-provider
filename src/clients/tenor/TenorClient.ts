import { Maybe } from "monet";
import rp from "request-promise";
import { Gif } from "../../Gif";
import { convertResponseIntoGifs } from "./utils";

export class TenorClient {
  private static instance: TenorClient;
  private readonly baseUri: string = "https://api.tenor.com/v1";

  private constructor(private readonly apiKey: string) {}

  public static init(apiKey: string): Maybe<TenorClient> {
    if (!TenorClient.instance) {
      TenorClient.instance = new TenorClient(apiKey);
    }

    return TenorClient.getInstance();
  }

  public static getInstance(): Maybe<TenorClient> {
    return Maybe.fromUndefined(TenorClient.instance);
  }

  // --- Instance Methods ---

  public async search(query: string, limit = 30): Promise<Array<Gif>> {
    return rp({
      uri: `${this.baseUri}/search`,
      qs: {
        key: this.apiKey,
        q: query,
        locale: "en_US",
        media_filter: "minimal",
        limit,
      },
      json: true,
    })
      .then(convertResponseIntoGifs)
      .catch(() => [] as Gif[]);
  }

  public async trending(limit = 30): Promise<Array<Gif>> {
    return rp({
      uri: `${this.baseUri}/trending`,
      qs: {
        key: this.apiKey,
        locale: "en_US",
        media_filter: "minimal",
        limit: limit,
      },
      json: true,
    })
      .then(convertResponseIntoGifs)
      .catch(() => [] as Gif[]);
  }
}
