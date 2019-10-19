// Add new GifProviders here to have them exposed to the factory

// 1. import the provider
import {GiphyGifProvider} from './GiphyGifProvider';

// 2. add an instance to the export
export const providersList = [
    { name: "giphy", class: new GiphyGifProvider() }
];
