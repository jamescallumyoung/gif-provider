import { Either } from "monet";
import { map, pipe } from "ramda";
import { Gif } from "../../Gif";
import {
  convertEithersToMaybes,
  getGifsFromMaybes,
} from "../../utils/monad-utils";
import { GiphyApiResponse } from "./GiphyApiResponse";

// The typescript-eslint/no-explicit-any rule is disabled below as we cannot know the type of the imported data.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractDataFromResponse = (response: GiphyApiResponse): Array<any> =>
  response?.data || [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertDataToEithers = map((d: any) =>
  Either.fromTry(
    () => new Gif(d.images.original.url, d.images.fixed_width_small.url)
  )
);

export const convertResponseToGifs = pipe(
  extractDataFromResponse,
  convertDataToEithers,
  convertEithersToMaybes,
  getGifsFromMaybes
);
