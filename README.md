# Jest puppeteer tests

This project is to try puppeteer with jest for web applications testing

###More information:

* Jest: https://jestjs.io/docs/en/getting-started
* Puppeteer: https://developers.google.com/web/tools/puppeteer/
             https://github.com/GoogleChrome/puppeteer
* Jest html report: https://github.com/Hargne/jest-html-reporter/wiki/configuration
* Docker: https://github.com/buildkite/docker-puppeteer

## Installing

### Resolve all dependencies
```
npm install
```

### Jest:
```
npm install jest jest-cli --save-dev
```

### Jest html reporter:
```
npm install jest-html-reporter --save-dev
```

### Puppeteer:
```
npm install --save-dev puppeteer
```

### Lighthouse:
```
npm install --save-dev lighthouse
```





## Running the tests

```
./node_modules/.bin/jest
```
or
```
npm run test
```
Run specific test suite:
```
npm test -- 1.smoke.test.js
```

### Debugging tips
Browser window configuration is in setup.js
```
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--window-size=1920,1080'
        ],
        defaultViewport: null,
        headless: false,
        slowMo: 0
    });
```
* Turn off headless mode - sometimes it's useful to see what the browser is displaying. Instead of launching in headless mode, launch a full version of the browser using 
```
headless: false:
```
* Slow it down - the slowMo option slows down Puppeteer operations by the specified amount of milliseconds. It's another way to help see what's going on
```
slowMo: 250 // slow down by 250ms
```
* Window size - currently set to full hd. Page is launched to fit browser window
```
'--window-size=1920,1080'
```

### Quick install + run test
```
npm install
npm run test
```

##  Docker

### Build
```
docker build -t jest-puppeteer/tests .
```
### Run
```
docker run -i -t jest-puppeteer/tests /bin/bash
```

## Lighthouse

https://github.com/GoogleChrome/lighthouse

### Run
```
lighthouse https://www.mulberry.com/ view
```

## Performance

https://github.com/llatinov/sample-performance-testing-in-browser