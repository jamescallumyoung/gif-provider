/**
 * A DataObject that represents a Gif
 * @property originalUrl {String} - The URL of the full size GIF
 * @property thumbnailUrl {String} - The URL of the thumbnail GIF
 */
export class Gif {

    private readonly _originalUrl: string;
    private readonly _thumbnailUrl: string;

    constructor(originalUrl: string, thumbnailUrl: string) {
        this._originalUrl = originalUrl;
        this._thumbnailUrl = thumbnailUrl;
    }

    get originalUrl() {
        return this._originalUrl;
    }

    get thumbnailUrl() {
        return this._thumbnailUrl;
    }
}
