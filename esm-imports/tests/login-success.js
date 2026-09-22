import { LoginPage } from '../pages/loginPage';
import { VALID_USERNAME, VALID_PASSWORD } from '../support/testData';

web.init();

const page = new LoginPage();
page.open();
page.login(VALID_USERNAME, VALID_PASSWORD);

const message = page.getFlashMessage();
log.info('flash message: ' + message);
assert.contain(message, 'You logged into a secure area');

web.dispose();
