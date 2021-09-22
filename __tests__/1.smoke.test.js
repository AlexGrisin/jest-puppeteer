const home = require('../pages/Home');
const login = require('../pages/Login');
const myAccount = require('../pages/MyAccount');
const cart = require('../pages/Cart');

describe('first suite', () => {

    test('Open home', async () => {
        await home.open();
        await home.isAtPage();
    }, 100000);

    test('Login to my account', async () => {
        await home.open();
        await home.goToLogin();
        await login.isAtPage();
        await login.login();
        await myAccount.isAtPage();
    }, 100000);

    test('Go to cart', async () => {
        await home.open();
        await home.goToCart();
        await cart.isAtPage();
    }, 100000);

});