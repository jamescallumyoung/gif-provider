import { Gif } from "../Gif";

export interface SearchClient {
    search: (query: string, limit?: number) => Promise<Array<Gif>>;
}
