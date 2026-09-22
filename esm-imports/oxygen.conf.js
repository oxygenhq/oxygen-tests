module.exports = {
    //
    // ======
    // Suites
    // ======
    //
    suites: [{
        name: 'Login',
        cases: [
            { path: './tests/login-success.js' },
            { path: './tests/login-failure.js' },
        ]
    }, {
        name: 'Pitfalls',
        cases: [
            { path: './tests/pitfall-demo.js' },
        ]
    }],

    // ============
    // Capabilities
    // ============
    capabilities: [{
        browserName: 'chrome',
        // switch to 'ie' to try this same project against Internet Explorer
        // browserName: 'ie',
    }],

    // =======
    // Modules
    // =======
    modules: ['web', 'log', 'assert'],

    // =========
    // Framework
    // =========
    framework: 'oxygen',

    // =========
    // Reporting
    // =========
    reporting: {
        reporters: ['html'],
    },
};
