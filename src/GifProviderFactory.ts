import {providersList} from "./providers/providersList";
import {GifProvider} from "./GifProvider";

export class GifProviderFactory {

    /**
     * Takes an array of source names and returns an array of providers which match.
     * @param sources - The names of the [[GifProvider]]s to find
     */
    static getProviders(sources: string[] = []) : GifProvider[] {
        return providersList
            .filter( (provider) => sources.indexOf(provider.name) > -1 )
            .map( (provider) => provider.class );
    }
}
