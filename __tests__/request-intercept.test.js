const home = require('../pages/Home');

describe('intercept and abort media type requests', () => {

    beforeAll(async () => {
        await global.__PAGE__.setRequestInterception(true);
        global.__PAGE__.on('request', request => {
            console.log(request._url);
            console.log(request._resourceType);
            //if (request.url().endsWith('.png') || request.url().endsWith('.jpg'))
            if (request.resourceType() === 'image') {
                request.abort();
            } else
                request.continue();
        });
    });

    test('Open home', async () => {
        await home.open();
        await home.isAtPage();
    }, 100000);

});