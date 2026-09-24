// A page object written with ES module syntax (export class), rather than the older
// module.exports.LoginPage = ... style. Exercises the same import/export support as
// the login-success.js / login-failure.js test cases that import this file - plus,
// with this import, a 2-level import chain: test -> loginPage -> testData.
import { LOGIN_URL } from '../support/testData';
import actions from '../support/actions';

export class LoginPage {
    async open() {
        web.open(LOGIN_URL);
    }

    async login(username, password) {
        web.type('id=username', username);
        web.type('id=password', password);
        actions.clickButton('css=button[type="submit"]');
    }

    async getFlashMessage() {
        web.waitForVisible('id=flash');
        return web.getText('id=flash');
    }
}
