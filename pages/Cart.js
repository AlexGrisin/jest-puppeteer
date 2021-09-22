const url = 'https://www.mulberry.com/gb/mlb/shopping-bag';

selectors = {
    at: 'body.basket'
};

class LoginPage {

    constructor() {
        this.page = global.__PAGE__;
    }

    async open() {
        return await this.page.goto(url)
    }

    async isAtPage() {
        await this.page.waitForSelector(selectors.at)
    }

}

module.exports = new LoginPage();