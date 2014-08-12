#flux-examples [![Dependency Status](https://david-dm.org/yahoo/flux-example.svg)](https://david-dm.org/yahoo/flux-example)

Example isomorphic Flux applications using [dispatchr](https://github.com/yahoo/dispatchr), [routr](https://github.com/yahoo/routr), and [fetchr](https://github.com/yahoo/fetchr).

The server-side React components and dispatchr get dehydrated on the server-side and sent to the client using express-state. The client.js (compiled by webpack) then bootstraps and rehydrates the dispatchr instance and the stores to same state as what they were on the server.

Usage
-----

```
npm install
cd <folder>
webpack
node server.js
```

Open http://localhost:3000
