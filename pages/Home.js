const url = 'https://www.mulberry.com/gb/';

const selectors = {
    at: 'body.home',
    links: {
        Login: '.personal-nav__my-account',
        Cart: '.personal-nav__shopping-bag'
    }
};

class Home {

    constructor() {
        this.page = global.__PAGE__;
    }

    async open() {
        return await this.page.goto(url)
    }

    async goToLogin() {
        const linkPresent = await this.page.waitForSelector(
            selectors.links['Login']
        );
        await linkPresent;
        return await Promise.all([
            this.page.waitForNavigation({waitUntil: 'load'}),
            this.page.click(selectors.links['Login'])
        ]);
    }

    async goToCart() {
        const linkPresent = await this.page.waitForSelector(
            selectors.links['Cart']
        );
        await linkPresent;
        return await Promise.all([
            this.page.waitForNavigation({waitUntil: 'load'}),
            this.page.click(selectors.links['Cart'])
        ]);
    }

    async isAtPage() {
        await this.page.evaluate(() => {debugger;});
        await this.page.screenshot({ path: 'screenshots/home-page.png', fullPage: true });
        // await this.page.pdf({path: 'screenshots/home-page.pdf', format: 'A4', printBackground: true});
        await this.page.waitForSelector('body.home')
    }

}

module.exports = new Home();