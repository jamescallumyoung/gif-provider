import { Gif } from "../../Gif";
import { GiphyClient } from "../../clients";
import { GifStrategy } from "../GifStrategy";

export class GiphyStrategy implements GifStrategy {
  readonly name: string = "giphy";

  public constructor(private readonly client: GiphyClient) {}

  public async search(query: string, limit: number): Promise<Array<Gif>> {
    return this.client.search(query, limit);
  }

  public async trending(limit: number): Promise<Array<Gif>> {
    return this.client.trending(limit);
  }
}
