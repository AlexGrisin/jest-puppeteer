const home = require('../pages/Home');
const devices = require('puppeteer/DeviceDescriptors');
const iPhonex = devices['iPhone X'];

describe('first suite', () => {

    beforeAll(async () => {
        await global.__PAGE__.emulate(iPhonex);
    });

    test('Open home', async () => {
        await home.open();
        await home.isAtPage();
    }, 100000);

});