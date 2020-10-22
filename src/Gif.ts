/**
 * A Data Object that represents a Gif.
 *
 * @property originalUrl - The URL of the full size GIF
 * @property thumbnailUrl - The URL of the thumbnail GIF
 */
export class Gif {
  constructor(readonly originalUrl: string, readonly thumbnailUrl: string) {}
}

/**
 * Type Guard to determine if an object is a Gif
 * @param nilable can be an `any` or `nil` (`null|undefined`)
 */
export const isGif = (nilable: unknown): nilable is Gif => {
  return nilable instanceof Gif;
};
