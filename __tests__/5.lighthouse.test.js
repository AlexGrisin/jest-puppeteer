const lighthouseHelper = require("../helpers/lighthouseHelper");

let lhr;
const URL = 'https://www.wilko.com/';

describe('Google Lighthouse audit tests', () => {
    beforeAll(async () => {
        lhr = await lighthouseHelper.lighthouseAudit(global.__BROWSER__, URL);
        lighthouseHelper.createLighthouseReport(lhr);
    });

    afterAll(async () => {
        lighthouseHelper.createLighthouseReport(lhr);
    });

    // General accessibility overview score
    test('passes an accessibility audit through Lighthouse', async () => {
        const accessibilityScore = await lighthouseHelper.getLighthouseResult(lhr, 'accessibility');
        // Tester can set their own thresholds for pass marks
        expect(accessibilityScore).toBeGreaterThanOrEqual(90);
    });

    // General performance overview score
    test('passes a performance audit through Lighthouse', async () => {
        const performanceScore = await lighthouseHelper.getLighthouseResult(lhr, 'performance');
        // Tester can set their own thresholds for pass marks
        expect(performanceScore).toBeGreaterThan(75);
    });

    // General best practice for websites overview score
    test('passes a best practice audit through Lighthouse', async () => {
        const bestPracticeScore = await lighthouseHelper.getLighthouseResult(lhr, 'bestPractices');
        // Tester can set their own thresholds for pass marks
        expect(bestPracticeScore).toBeGreaterThanOrEqual(75);
    });

    // These checks validate the aspects of a Progressive Web App,
    // as specified by the baseline [PWA Checklist]
    test('passes a Progressive Web App audit through Lighthouse', async () => {
        const progressiveWebAppScore = await lighthouseHelper.getLighthouseResult(lhr, 'progressiveWebApp');
        // Tester can set their own thresholds for pass marks
        expect(progressiveWebAppScore).toBeGreaterThanOrEqual(75);
    });

    //These checks ensure that your page is optimized for search engine results ranking.
    test('passes an SEO audit through Lighthouse', async () => {
        const SEOScore = await lighthouseHelper.getLighthouseResult(lhr, 'seo');
        expect(SEOScore).toBeGreaterThanOrEqual(75);
    });

    // Low-contrast text is difficult or impossible for many users to read
    test('passes a contrast check through Lighthouse', async () => {
        const contrastCheck = await lighthouseHelper.getResult(lhr, 'contrast');
        // Some audit items are binary, so no threshold can be set
        expect(contrastCheck).toEqual('Pass');
    });

    // Informative elements should aim for short, descriptive alternate text
    test('contains alt text for all images', async () => {
        const altTextCheck = await lighthouseHelper.getResult(lhr, 'altText');
        expect(altTextCheck).toEqual('Pass');
    });

    // Speed Index shows how quickly the contents of a page are visibly populated.
    test('passes the set threshold for page load speed', async () => {
        const pageSpeedScore = await lighthouseHelper.getLighthouseResult(lhr, 'pageSpeed');
        expect(pageSpeedScore).toBeGreaterThanOrEqual(75);
    });

    // Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid names
    test('contains valid ARIA attributes', async () => {
        const ariaAttributesCheck = await lighthouseHelper.getResult(lhr, 'ariaAttributesCorrect');
        expect(ariaAttributesCheck).toEqual('Pass');
    });

    // Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values
    test('contains valid values for all ARIA attributes', async () => {
        const ariaAttributeValuesCheck = await lighthouseHelper.getResult(lhr, 'ariaAttributeValuesCorrect');
        expect(ariaAttributeValuesCheck).toEqual('Pass');
    });

    // A value greater than 0 implies an explicit navigation ordering. Although technically valid,
    // this often creates frustrating experiences for users who rely on assistive technologies
    test('contains no tabIndex values above 0', async () => {
        const tabIndexCheck = await lighthouseHelper.getResult(lhr, 'tabIndex');
        expect(tabIndexCheck).toEqual('Pass');
    });

    // Tabbing through the page follows the visual layout.
    // Users cannot focus elements that are offscreen
    test('has a logical tab order for assitive technology use', async () => {
        const logicalTabOrderCheck = await lighthouseHelper.getResult(lhr, 'logicalTabOrder');
        expect(logicalTabOrderCheck).toEqual('Pass');
    });

    // Some third-party scripts may contain known security vulnerabilities
    // that are easily identified and exploited by attackers
    test('contains no known vulnerable libraries', async () => {
        const vulnerabilities = await lighthouseHelper.getResult(lhr, 'vulnerabilities');
        expect(vulnerabilities).toEqual('Pass');
    });
});