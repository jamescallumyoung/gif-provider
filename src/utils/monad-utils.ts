import {map, pipe} from "ramda";
import {Either, Maybe} from "monet";
import {Gif} from "../Gif";

export const convertEithersToMaybes = map( (e: Either<Error, Gif>) => e.toMaybe() );

export const getGifsFromMaybes = pipe(
    (arr:Array<Maybe<Gif>>) => arr.filter( (m: Maybe<Gif>) => m.isSome() ),
    map( (m: Maybe<Gif>) => m.some() ),
);
