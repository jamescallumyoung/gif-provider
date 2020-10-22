<div align="center">
  <h1><code>gif-provider</code></h1>

  <p>
    <strong>A JavaScript module to search for gifs</strong>
  </p>

  <p>
    <a href="https://www.npmjs.com/package/@jych/gif-provider" target=_blank">
   	   <img
   	     alt="npm package"
   	     src="https://img.shields.io/npm/v/@jych/gif-provider?style=flat-square"
   	   />
    </a>
    <a href="./LICENSE" target="_blank">
      <img
        alt="License: MIT"
        src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square"
      />
    </a>
  </p>

</div>

_gif-provider_ is a JavaScript module that allows you to query various gif APIs. Queries can be
done to a single API at a time, or to multiple, with the results aggregated.

The module currently supports fetching gifs from [Giphy](https://developers.giphy.com/docs/api/)
and [Tenor](https://tenor.com/gifapi). Other APIs may be added in the future.

You can easily extend gif-provider to support other APIs, either by contributing on 
[GitHub](https://github.com/jamescallumyoung/gif-provider), or by implementing your own class
implementing the GifStrategy interface.

The module includes its own optional typings for TypeScript.

See the [API documentation](https://jych.gitlab.io/gif-provider/docs/) here.


### Example Usage

```javascript

const {
    GifProviderBuilder,
    GiphyStrategy,
    TenorStrategy,
    GiphyClient,
    TenorClient,
} = require('@jych/gif-provider');

const builder = new GifProviderBuilder();

// Querying Giphy

const giphyStrategy = new GiphyStrategy(
    GiphyClient.init('my-giphy-api-key').some()
);

builder.addStrategy(giphyStrategy);

const gifProvider = builder.build();

const gifs = await gifProvider.search("rat mouse"); // gifs is an array of results from giphy

// Querying Giphy and Tenor

const tenorStrategy = new TenorStrategy(
    TenorClient.init('my-tenor-api-key').some()
);

builder.addStrategy(tenorStrategy);

const gifProvider2 = builder.build();

const gifs = await gifProvider.search("rat mouse"); // gifs is a flat array of results from each site

```

## Docs

See the [online docs](https://jych.gitlab.io/gif-provider/docs/) or generate a local copy for offline use:

```bash
yarn install
yarn generate-docs
open docs/index.html
```

# Contributing

Contributions, issues and feature requests are welcome! Feel free to check the
[issues page](https://github.com/jamescallumyoung/gif-provider/issues) for an idea of where to get
started. Contributors must follow the [contributing guide](./CONTRIBUTING.md) and
[code of conduct](./CODE_OF_CONDUCT.md).

# License

Copyright © 2020 [James Young](https://github.com/jamescallumyoung).<br />
This project is MIT licensed. See [LICENSE](LICENSE) for more details.
