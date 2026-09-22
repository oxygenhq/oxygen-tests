// The simpler alternative to pitfalls/topLevelReady.js's `__ready` pattern: the
// same kind of call, moved inside an exported function instead of sitting at the
// file's own top level. Calls inside an exported function are correctly awaited by
// the transform automatically, so this needs no `__ready` handling by callers at all.

module.exports.getPageTitle = () => {
    return web.getTitle();
};
