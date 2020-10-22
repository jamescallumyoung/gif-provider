import { Gif } from "../../Gif";
import { TenorClient } from "../../clients";
import { GifStrategy } from "../GifStrategy";

export class TenorStrategy implements GifStrategy {
  readonly name: string = "tenor";

  public constructor(private readonly client: TenorClient) {}

  public async search(query: string, limit: number): Promise<Array<Gif>> {
    return this.client.search(query, limit);
  }

  public async trending(limit: number): Promise<Array<Gif>> {
    return this.client.trending(limit);
  }
}
