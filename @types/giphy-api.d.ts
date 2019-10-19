declare module "giphy-api" {

    interface GiphyApiResponse {
        data: any[],
        meta: any,
        pagination: any
    }

    function fn(apiKey?: string, options?: any): GiphyApi;

    export = fn;
}

interface callback {
    (result: GiphyApiResponse): any
}

interface OptionsFn<T> {
    (options: T, callback?: callback): Promise<GiphyApiResponse>
}

declare interface GiphyApi {
    search: OptionsFn<{ q: string, limit: number }>,
    id: OptionsFn<{ id: String }>,
    translate: OptionsFn<any>, // ?
    random: OptionsFn<any> // ?
    trending: OptionsFn<{ limit: number }>

}

declare interface GiphyApiResponse {
    data: any[],
    meta: any,
    pagination: any
}
