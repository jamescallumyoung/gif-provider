/**
 * A DataObject that represents a Gif.
 *
 * @property originalUrl - The URL of the full size GIF
 * @property thumbnailUrl - The URL of the thumbnail GIF
 */
export class Gif {

    private readonly _originalUrl: string;
    private readonly _thumbnailUrl: string;

    constructor(originalUrl: string, thumbnailUrl: string) {
        this._originalUrl = originalUrl;
        this._thumbnailUrl = thumbnailUrl;
    }

    /** @returns The URL for the full size Gif file */
    get originalUrl() {
        return this._originalUrl;
    }

    /** @returns The URL for the thumbnail size Gif file */
    get thumbnailUrl() {
        return this._thumbnailUrl;
    }
}
