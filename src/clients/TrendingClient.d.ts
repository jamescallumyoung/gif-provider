import { Gif } from "../Gif";

export interface TrendingClient {
    trending: (limit?: number) => Promise<Array<Gif>>;
}
