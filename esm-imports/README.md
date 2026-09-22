# oxygen-examples-esm

A minimal Oxygen project for testing `scriptTransformer.js` fixes: ES module
(`import`/`export`) support, and detection of an Oxygen command sitting at a support
file's own top level. Structure:

```
oxygen.conf.js                   suite config (3 cases, chrome by default)
pages/loginPage.js               page object, `export class LoginPage { ... }`
support/testData.js              named exports, `export const VALID_USERNAME = ...`
tests/login-success.js           imports both of the above, asserts a successful login
tests/login-failure.js           same page/data imports, asserts a failed-login message
pitfalls/topLevelReady.js        an Oxygen call at a support file's top level, exposed
                                  via `module.exports.__ready` (see below)
pitfalls/topLevelCallGood.js     the same call, but moved inside an exported function -
                                  the simpler alternative that needs no __ready handling
tests/pitfall-demo.js            requires both pitfalls/ files and verifies each works
```

**Login suite** exercises `import { X } from '../...'` against `../pages/loginPage.js` (an
ES `export class`) and `../support/testData.js` (ES named `export const`s) — the two export
styles the ESM fix needed to handle correctly (class exports needing `hasModuleExports`
detection, named-constant exports needing the actual CommonJS conversion).

**Pitfalls suite** demonstrates a support file that calls an Oxygen command (`web.click(...)`,
`utils.decrypt(...)`, etc.) at its own top level, outside any function. Loading such a file
via `require()` is inherently synchronous — Node has no way to pause `require()` for a
Promise — so the call can't be awaited right where it's written. `scriptTransformer.js`
handles this by wrapping that file's whole top level in an async IIFE and exposing it as
`module.exports.__ready`: a promise that resolves once the file's real top-level work has
actually finished. Any `require()` call the transform can itself await (inside a function,
or a test script's own top level) automatically awaits `__ready` too, so properties the
file sets asynchronously are already resolved by the time `require()` returns to calling
code — see `pitfalls/topLevelReady.js` and how `tests/pitfall-demo.js` requires it.
`pitfalls/topLevelCallGood.js` shows the simpler alternative for the common case: just move
the call inside an exported function, so it's awaited normally and no `__ready` handling
is needed at all.

Target site is `the-internet.herokuapp.com/login`, a public, stable test fixture with known
valid credentials (`tomsmith` / `SuperSecretPassword!`) - no setup needed beyond a browser
driver.

## Running

Using a local oxygen-cli checkout's build directly (adjust the path):

```bash
node /path/to/oxygen/build/lib/cli.js --cwd=. --autowd=true
```

Or, once `oxygen-cli` is installed as a normal dependency in this project:

```bash
npx oxygen --autowd=true
```

To try it against Internet Explorer instead of Chrome, edit `oxygen.conf.js` and swap
which `browserName` line is commented out in `capabilities`.
