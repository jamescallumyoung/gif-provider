# gif-provider

gif-provider is a JavaScript module that allows you to querying various gif APIs. Queries can
be done to a single API at a time, or to multiple, with the results aggregated.

The module currently supports fetching gifs from [Giphy](https://developers.giphy.com/docs/api/).
Support for [Tenor](https://tenor.com/gifapi) is in progress.

You can easily extend gif-provider to support other APIs, either by contributing on 
[GitLab](https://gitlab.com/jych/gif-provider), or by implementing your own GifProvider class.

## Installation

```bash
npm install --save @jych/gif-provider
```

## Getting Started

### Installing

In Node and CommonJS build systems:

```JavaScript
const {GifProviderFactory} = require('@jych/gif-provider');
```

In ES6 Modules and Typescript:

```JavaScript
import {GifProviderFactory} from 'jych/gif-provider';
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

const gifProvider =
new CompositeGifProvider(GifProviderFactory.getProviders([ "giphy", "other", "foobar" ]));

gifProvider.search("rat mouse")
 .then( gifs => {
     
     // gifs is a flat array of results from each site
     
     // ...
 } );
```

## Docs

Full docs can be generated for offline use with:

```bash
npm i @jych/gif-provider
cd node_modules/@jych/gif-provider
npm i
npm run generate-docs
cd docs
open index.html 
```
