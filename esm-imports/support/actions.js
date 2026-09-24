// A class plus a default-exported instance of it - the shape most page-object projects use
// (`export default new WebActions()`), imported elsewhere with `import actions from ...`.
// Default imports go through a Babel-injected helper, which the transform must leave synchronous.
export class Actions {
    clickButton(locator) {
        web.click(locator);
    }
}

export default new Actions();
