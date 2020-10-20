import { Either } from "monet";
import { map, pipe } from "ramda";
import { TenorApiResponse, TenorGifResult } from "../../../@types/tenor-api";
import { Gif } from "../../Gif";
import { convertEithersToMaybes, getGifsFromMaybes } from "../../utils/monad-utils";

const getResultsFromResponse = (response:TenorApiResponse) => response?.results || [];

const convertResultsToEithers = map( (result:TenorGifResult) =>
    Either.fromTry( () => new Gif(
        result.media[0].gif.url,
        result.media[0].tinygif.url
    )));

export const convertResponseIntoGifs = pipe(
    getResultsFromResponse,
    convertResultsToEithers,
    convertEithersToMaybes,
    getGifsFromMaybes,
);

