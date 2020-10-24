export interface GfycatApiResponse {
  gfycats: GfycatApiItem[];
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface GfycatApiItem {
  poster_url: string;
  url: string;
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
