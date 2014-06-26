An example Flux application using dispatchr. The server-side React components and dispatchr get dehydrated on the server-side and sent to the client using express-state. The client.js (compiled by webpack) then bootstraps and rehydrates the dispatchr instance and the stores to same state as what they were on the server.

Usage
-----

```
npm install
node server.js
```
