#flux-examples

[![Dependency Status](https://david-dm.org/yahoo/flux-examples.svg)](https://david-dm.org/yahoo/flux-examples)
[![devDependency Status](https://david-dm.org/yahoo/flux-examples/dev-status.svg)](https://david-dm.org/yahoo/flux-examples#info=devDependencies)

Example isomorphic [Flux](http://facebook.github.io/react/docs/flux-overview.html) applications using [Fluxible](http://fluxible.io), [fluxible-plugin-routr](https://github.com/yahoo/fluxible-plugin-routr), and [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr).

The server-side rendered React components and store instances get dehydrated and sent to the client using [express-state](https://github.com/yahoo/express-state). The client.js (compiled by [webpack](https://github.com/webpack/webpack)) then bootstraps and rehydrates the dispatcher instance and the stores to same state as what they were on the server.

There are multiple examples in this repo:

* [Chat](https://github.com/yahoo/flux-examples/tree/master/chat) - Port of [Facebook's Flux chat example](https://github.com/facebook/flux/tree/master/examples/flux-chat).
* [Fluxible Routing](https://github.com/yahoo/flux-examples/tree/master/fluxible-router) - Simple isomorphic routing using [Fluxible](http://fluxible.io).
* [React Routing](https://github.com/yahoo/flux-examples/tree/master/react-router) - Isomorphic routing using [react-router](https://github.com/rackt/react-router).
* [To Do](https://github.com/yahoo/flux-examples/tree/master/todo) - Port of [ToDo MVC](https://github.com/tastejs/todomvc).

Alternatively, for a fully featured application you can check out the [fluxible.io](http://fluxible.io) docs website repository for more integration examples:

* https://github.com/yahoo/fluxible.io


Usage
-----

```
npm install
cd <folder>
npm run dev
```

Open http://localhost:3000

For more information on what's going on, you can use `DEBUG=* node` to see full debug output on the server.


# License

Unless otherwise specified, this software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/flux-examples/blob/master/LICENSE.md
