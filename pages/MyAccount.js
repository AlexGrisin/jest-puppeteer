const url = 'https://www.mulberry.com/gb/account';

const selectors = {
    at: 'body.account-homepage',
    fields: {
        login: '#emailInput',
        password: '#passwordInput'
    },
    buttons: {
        LoginFormSubmit: '.sign-in__cta'
    }
};

class MyAccount {

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

module.exports = new MyAccount();