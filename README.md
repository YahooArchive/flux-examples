#flux-examples [![Dependency Status](https://david-dm.org/yahoo/flux-examples.svg)](https://david-dm.org/yahoo/flux-examples)

Example isomorphic [Flux](http://facebook.github.io/react/docs/flux-overview.html) applications using [dispatchr](https://github.com/yahoo/dispatchr), [routr](https://github.com/yahoo/routr), and [fetchr](https://github.com/yahoo/fetchr).

The server-side rendered React components and store instances get dehydrated and sent to the client using [express-state](https://github.com/yahoo/express-state). The client.js (compiled by [webpack](https://github.com/webpack/webpack)) then bootstraps and rehydrates the dispatcher instance and the stores to same state as what they were on the server.

There are multiple examples in this repo:

[Chat](/yahoo/flux-examples/tree/master/chat) - Port of [Facebook's Flux chat example](https://github.com/facebook/flux/tree/master/examples/flux-chat)
[Routing](/yahoo/flux-examples/tree/master/routing) - Simple isomorphic routing in flux flow

Usage
-----

```
npm install
cd <folder>
npm run build
npm start
```

Open http://localhost:3000

For more information on what's going on, you can use `DEBUG=* node` to see full debug output on the server.

# License

Unless otherwise specified, this software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/flux-examples/blob/master/LICENSE.md
