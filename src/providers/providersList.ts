// Add new GifProviders here to have them exposed to the factory

import {GifProvider} from "../GifProvider";

interface ProviderRecord {
    name: string,
    class: GifProvider
}

// 1. import the provider
import {GiphyGifProvider} from './GiphyGifProvider';
import {TenorGifProvider} from './TenorGifProvider'

// 2. add an instance to the export
/**
 * @ignore
 */
export const providersList: ProviderRecord[] = [
    { name: "giphy", class: new GiphyGifProvider() },
    { name: "tenor", class: new TenorGifProvider() }
];
