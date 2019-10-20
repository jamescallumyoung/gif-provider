// Add new GifProviders here to have them exposed to the factory

import {GifProvider} from "../GifProvider";

interface ProviderRecord {
    name: string,
    class: GifProvider
}

// 1. import the provider
import {GiphyGifProvider} from './GiphyGifProvider';

// 2. add an instance to the export
export const providersList: ProviderRecord[] = [
    { name: "giphy", class: new GiphyGifProvider() }
];
