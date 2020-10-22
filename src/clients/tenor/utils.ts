import { Either } from "monet";
import { map, pipe } from "ramda";
import { Gif } from "../../Gif";
import {
  convertEithersToMaybes,
  getGifsFromMaybes,
} from "../../utils/monad-utils";
import { TenorApiResponse, TenorGifResult } from "./tenor-api";

const getResultsFromResponse = (
  response: TenorApiResponse
): Array<TenorGifResult> => response?.results || [];

const convertResultsToEithers = map((result: TenorGifResult) =>
  Either.fromTry(
    () => new Gif(result.media[0].gif.url, result.media[0].tinygif.url)
  )
);

export const convertResponseIntoGifs = pipe(
  getResultsFromResponse,
  convertResultsToEithers,
  convertEithersToMaybes,
  getGifsFromMaybes
);
