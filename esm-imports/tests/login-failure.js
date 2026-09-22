import { LoginPage } from '../pages/loginPage';
import { VALID_USERNAME, INVALID_PASSWORD } from '../support/testData';

web.init();

const page = new LoginPage();
page.open();
page.login(VALID_USERNAME, INVALID_PASSWORD);

const message = page.getFlashMessage();
log.info('flash message: ' + message);
assert.contain(message, 'Your password is invalid');

web.dispose();
