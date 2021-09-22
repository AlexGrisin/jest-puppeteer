const home = require('../pages/Home');

const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const ScreenshotTester = require('puppeteer-screenshot-tester');


describe('first suite', () => {

    // test('puppeteer-screenshot-tester', async () => {
    //     // create ScreenshotTester with optional config
    //     const tester = await ScreenshotTester(0.1, false, false, [], {
    //         transparency: 0.5
    //     });
    //
    //     await global.__PAGE__.setViewport({width: 1920, height: 1080});
    //     await global.__PAGE__.goto('https://www.mulberry.com', { waitUntil: 'networkidle0' });
    //
    //     // call our tester with browser page returned by puppeteer browser
    //     // second parameter is optional it's just a test name if provide that's filename
    //     const result = await tester(global.__PAGE__, '..screenshots/puppeteer-screenshot-tester/mulberry-home', {
    //         fullPage: true,
    //         saveNewImageOnError: true
    //     });
    //
    //     // make assertion result is always boolean
    //     expect(result).toBe(true)
    // }, 100000);

    test('jest-image-snapshot', async () => {

        const customConfig = { threshold: 0.1 };

        await home.open();
        const image = await home.page.screenshot();

        expect(image).toMatchImageSnapshot({
            customDiffConfig: customConfig,
            customSnapshotsDir: './screenshots/__image_snapshots__',
            updatePassedSnapshot: true
        });
    }, 100000);

});