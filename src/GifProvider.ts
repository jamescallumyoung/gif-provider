import Bluebird from 'bluebird';
import flatten from 'lodash/fp/flatten';
import take from 'lodash/fp/take';
import { pipe } from 'ramda';
import { Gif } from "./Gif";
import { GifStrategy } from "./strategies";

export class GifProvider {

    public constructor(
        private readonly strategies: Array<GifStrategy>
    ) {}

    public async search(query: string, limit: number = 30): Promise<Array<Gif>> {
        const results = await Bluebird.map(this.strategies, strategy => strategy.search(query, limit));
        const takeLimit = take(limit);
        return pipe(flatten, takeLimit)(results);
    }

    public async trending(limit: number = 30): Promise<Array<Gif>> {
        const results = await Bluebird.map(this.strategies, strategy => strategy.trending(limit));
        const takeLimit = take(limit);
        return pipe(flatten, takeLimit)(results);
    }

}