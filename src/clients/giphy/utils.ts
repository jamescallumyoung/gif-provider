import {Gif} from "../../Gif";
import {Either} from "monet";
import {map, pipe} from "ramda";
import {convertEithersToMaybes, getGifsFromMaybes} from "../../utils/monad-utils";

const extractDataFromResponse = (response:GiphyApiResponse) => response?.data || [];

const convertDataToEithers = map((d: any) =>
    Either.fromTry( () => new Gif(
        d.images.original.url,
        d.images.fixed_width_small.url
    )));

export const convertResponseToGifs = pipe(
    extractDataFromResponse,
    convertDataToEithers,
    convertEithersToMaybes,
    getGifsFromMaybes,
);
