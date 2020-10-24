import { Either } from "monet";
import { map, pipe } from "ramda";
import { GfycatApiResponse, GfycatApiItem } from "./gfycat-api";
import { Gif } from "../../Gif";
import {
  convertEithersToMaybes,
  getGifsFromMaybes,
} from "../../utils/monad-utils";

const getResultsFromResponse = (
  response: GfycatApiResponse
): Array<GfycatApiItem> => response.gfycats || [];

const convertResultsToEithers = map((item: GfycatApiItem) =>
  Either.fromTry(
    () =>
      new Gif(
        item?.gifUrl || item?.max5mbGif || item?.max2mbGif || item?.max1mbGif,
        item?.max1mbGif || item?.max2mbGif || item?.max5mbGif || item?.gifUrl
      )
  )
);

export const convertResponseIntoGifs = pipe(
  getResultsFromResponse,
  convertResultsToEithers,
  convertEithersToMaybes,
  getGifsFromMaybes
);
