export interface TenorApiResponse {
  next: string; // key used for pagination
  results: TenorGifResult[];
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TenorGifResult {
  media: TenorGifMedia[];
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TenorGifMedia {
  gif: TenorGifMediaRecord;
  mp4: TenorGifMediaRecord;
  tinygif: TenorGifMediaRecord;
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TenorGifMediaRecord {
  url: string;
  preview: string;
  size: number;
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
