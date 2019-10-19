/**
 * A DataObject that represents a Gif
 * @property originalUrl {String} - The URL of the full size GIF
 * @property thumbnailUrl {String} - The URL of the thumbnail GIF
 */
export class Gif {

    private readonly originalUrl: string;
    private readonly thumbnailUrl: string;

    constructor(originalUrl: string, thumbnailUrl: string) {
        this.originalUrl = originalUrl;
        this.thumbnailUrl = thumbnailUrl;
    }
}
