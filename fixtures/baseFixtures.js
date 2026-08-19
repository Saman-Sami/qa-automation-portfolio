const base = require('@playwright/test');

const test = base.test.extend({
    page: async({ page }, use) => {
        await page.route(
            /(?:\.doubleclick\.net|fundingchoicesmessages\.google\.com|\.googlesyndication\.com)/,
            route => { 
                console.log('route matched: block')
                route.abort();
            });
        await use(page);
    }
})

exports.test = test;
exports.expect = base.expect;