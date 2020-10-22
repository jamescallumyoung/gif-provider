import { GifStrategy } from "./strategies";
import { GifProvider } from "./GifProvider";

export class GifProviderBuilder {
  private strategies: Array<GifStrategy> = [];

  /**
   * Add a Strategy to the builder.
   * @param strategy to add.
   */
  public addStrategy(strategy: GifStrategy): GifProviderBuilder {
    this.strategies.push(strategy);
    return this;
  }

  /**
   * Remove a Strategy from the builder.
   * N.B. This will remove _all_ strategies with the matching name
   * @param name of the strategy to remove.
   */
  public removeStrategy(name: string): GifProviderBuilder {
    this.strategies = this.strategies.filter(
      (strategy) => strategy.name !== name
    );
    return this;
  }

  public listStrategies(): Array<string> {
    return this.strategies.map((strategy) => strategy.name);
  }

  /**
   * Create a GifProvider from the current configuration.
   */
  public build(): GifProvider {
    return new GifProvider(this.strategies);
  }
}
