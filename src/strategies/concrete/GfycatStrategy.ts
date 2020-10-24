import { Gif } from "../../Gif";
import { GfycatClient } from "../../clients";
import { GifStrategy } from "../GifStrategy";

export class GfycatStrategy implements GifStrategy {
  readonly name: string = "gfycat";

  public constructor(private readonly client: GfycatClient) {}

  public async search(query: string, limit: number): Promise<Array<Gif>> {
    return this.client.search(query, limit);
  }

  public async trending(limit: number): Promise<Array<Gif>> {
    return this.client.trending(limit);
  }
}
