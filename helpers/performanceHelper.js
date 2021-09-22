'use strict';

async function gatherPerformanceTimingMetricsByName(page, entryName) {
    const rawMetrics = await page.evaluate(() => JSON.stringify(window.performance.getEntriesByName(entryName)));
    const metrics = JSON.parse(rawMetrics);
    return metrics;
}

async function gatherPerformanceTimingMetrics(page) {
    const rawMetrics = await page.evaluate(() => JSON.stringify(window.performance.getEntries()[0]));
    const metrics = JSON.parse(rawMetrics);
    return metrics;
}

async function processPerformanceTimingMetrics(metrics) {
    return {
        entryType: metrics.entryType,
        dnsLookup: metrics.domainLookupEnd - metrics.domainLookupStart,
        tcpConnect: metrics.connectEnd - metrics.connectStart,
        request: metrics.responseStart - metrics.requestStart,
        response: metrics.responseEnd - metrics.responseStart,
        domLoaded: metrics.domComplete - metrics.startTime,
        domInteractive: metrics.domInteractive - metrics.startTime,
        pageLoad: metrics.loadEventEnd - metrics.loadEventStart,
        fullTime: metrics.loadEventEnd - metrics.startTime
    }
}

module.exports = {
    gatherPerformanceTimingMetricsByName,
    gatherPerformanceTimingMetrics,
    processPerformanceTimingMetrics
};