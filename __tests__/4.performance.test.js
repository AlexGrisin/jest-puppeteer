const performanceHelper = require("../helpers/performanceHelper");
const home = require('../pages/Home');

describe('Google Lighthouse audit tests', () => {

    // General performance metrics
    test('performance metrics', async () => {
        await home.open();
        const rawMetrics = await performanceHelper.gatherPerformanceTimingMetrics(home.page);
        const metrics = await performanceHelper.processPerformanceTimingMetrics(rawMetrics);
        console.log(rawMetrics);
        console.log(metrics);
    }, 3000000);

    test('slow network', async () => {
        const client = await home.page.target().createCDPSession();
        await client.send('Network.enable');
        await client.send('Network.emulateNetworkConditions', {
            offline: false,
            latency: 200, // ms
            downloadThroughput: 780 * 1024 / 8, // 780 kb/s
            uploadThroughput: 330 * 1024 / 8, // 330 kb/s
        });
        await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
        await home.open();
        // console.log(await testPage(home.page, client));
    }, 30000);

});