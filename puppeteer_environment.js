// puppeteer_environment.js
const NodeEnvironment = require('jest-environment-node');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const os = require('os');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
    }

    async setup() {
        await super.setup();
        // get the wsEndpoint
        const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
        console.log('Running: ' + wsEndpoint);
        if (!wsEndpoint) {
            throw new Error('wsEndpoint not found');
        }

        // connect to puppeteer
        this.global.__BROWSER__ = await puppeteer.connect({
            browserWSEndpoint: wsEndpoint,
        });

        // create a new incognito browser context
        const context = await this.global.__BROWSER__.createIncognitoBrowserContext();

        // create a new page inside context
        this.global.__PAGE__ = await context.newPage();
        await this.global.__PAGE__.setViewport({ width: 1920, height: 1080});
        await this.global.__PAGE__._client.send('Emulation.clearDeviceMetricsOverride');
    }

    async teardown() {
        await this.global.__PAGE__.close();
        await super.teardown();
    }

    runScript(script) {
        return super.runScript(script);
    }
}

module.exports = PuppeteerEnvironment;