import {providersList} from "./providers/providersList";
import {GifProvider} from "./GifProvider";

export class GifProviderFactory {

    /**
     * Search for [[GifProvider|GifProviders]].
     *
     * @param sources - The names of the [[GifProvider|GifProviders]] to find
     */
    static getProviders(sources: string[] = []) : GifProvider[] {
        return providersList
            .filter( (provider) => sources.indexOf(provider.name) > -1 )
            .map( (provider) => provider.class );
    }
}
