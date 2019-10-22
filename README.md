# gif-provider

_gif-provider_ is a JavaScript module that allows you to querying various gif APIs. Queries can
be done to a single API at a time, or to multiple, with the results aggregated.

The module currently supports fetching gifs from [Giphy](https://developers.giphy.com/docs/api/)
and [Tenor](https://tenor.com/gifapi). Other APIs may be added in the future.

You can easily extend gif-provider to support other APIs, either by contributing on 
[GitHub](https://github.com/jamescallumyoung/gif-provider), or by implementing your own GifProvider class.

See the [API documenntation](https://jych.gitlab.io/gif-provider/docs/) here.

## Installation

```bash
npm install --save @jych/gif-provider
```

## Getting Started

### Installing

In Node and CommonJS build systems:

```JavaScript
const {GiphyGifProvider} = require('@jych/gif-provider');
```

In ES6 Modules and Typescript:

```JavaScript
import {GiphyGifProvider} from 'jych/gif-provider';
```

### Example Usage

Querying Giphy:

```JavaScript
const {GiphyGifProvider} = require('@jych/gif-provider');

const gifProvider = new GiphyGifProvider();

gifProvider.search("rat mouse")
.then( gifs => {
    // ...
} );
```

Querying multiple sites:

```javascript
const {CompositeGifProvider, GifProviderFactory} = require('@jych/gif-provider');

const providers = GifProviderFactory.getProviders([ "giphy", "tenor", "some-other-site" ];
const gifProvider = new CompositeGifProvider(providers);

gifProvider.search("rat mouse")
 .then( gifs => {
     
     // gifs is a flat array of results from each site
     // ...
 } );
```

## Docs

A full copy of the docs can be generated for offline use:

```bash
npm install @jych/gif-provider
cd node_modules/@jych/gif-provider
npm install
npm run generate-docs
open docs/index.html
```
