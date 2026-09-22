// A support file with an Oxygen command sitting at its own top level - outside any
// exported function. Loading this file via require() is inherently synchronous (Node
// has no way to pause require() for a Promise), so this call can't be awaited right
// where it's written. Instead, scriptTransformer.js wraps this file's whole top level
// in an async IIFE and exposes it as `module.exports.__ready` - a promise that
// resolves once the real work below has actually finished.
//
// require() itself still returns immediately, same as ever - but properties this file
// sets asynchronously (getPageTitle here) don't exist yet at that instant. Await
// `__ready` before using them. A require() call the transform can actually await
// (inside a function, or a test script's own top level) does this for you
// automatically - see tests/pitfall-demo.js.

var pageTitle = web.getTitle();

module.exports.getPageTitle = () => pageTitle;
