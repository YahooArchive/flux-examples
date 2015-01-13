#flux-examples

[![Dependency Status](https://david-dm.org/yahoo/flux-examples.svg)](https://david-dm.org/yahoo/flux-examples)
[![devDependency Status](https://david-dm.org/yahoo/flux-examples/dev-status.svg)](https://david-dm.org/yahoo/flux-examples#info=devDependencies)

Example isomorphic [Flux](http://facebook.github.io/react/docs/flux-overview.html) applications using [fluxible](https://github.com/yahoo/fluxible), [fluxible-plugin-routr](https://github.com/yahoo/fluxible-plugin-routr), and [fluxible-plugin-fetchr](https://github.com/yahoo/fluxible-plugin-fetchr).

The server-side rendered React components and store instances get dehydrated and sent to the client using [express-state](https://github.com/yahoo/express-state). The client.js (compiled by [webpack](https://github.com/webpack/webpack)) then bootstraps and rehydrates the dispatcher instance and the stores to same state as what they were on the server.

There are multiple examples in this repo:

* [Chat](https://github.com/yahoo/flux-examples/tree/master/chat) - Port of [Facebook's Flux chat example](https://github.com/facebook/flux/tree/master/examples/flux-chat)
* [Routing](https://github.com/yahoo/flux-examples/tree/master/routing) - Simple isomorphic routing in flux flow
* [To Do](https://github.com/yahoo/flux-examples/tree/master/todo) - Port of [ToDo MVC](https://github.com/tastejs/todomvc)

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

What's Next
-----------

We have a ton of ideas for where to go with this to eventually have a full suite of tools to create isomorphic Flux applications. We have some things in mind already, so see what we're up to by looking at our [issues](https://github.com/yahoo/flux-examples/issues).

# License

Unless otherwise specified, this software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/flux-examples/blob/master/LICENSE.md
