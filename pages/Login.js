const url = 'https://www.wilko.com/login';

const selectors = {
    at: 'body.account',
    fields: {
        login: '#emailInput',
        password: '#passwordInput'
    },
    buttons: {
        LoginFormSubmit: '.sign-in__cta'
    }
};

class Login {

    constructor() {
        this.page = global.__PAGE__;
    }

    async open() {
        return await this.page.goto(url)
    }

    async isAtPage() {
        await this.page.waitForSelector(selectors.at)
    }

    async login() {
        await this.fillInFormField('login', 'agrisin@tacitknowledge.com');
        await this.fillInFormField('password', '1qaz2wsx');
        await this.pressButton('LoginFormSubmit');
    }

    async fillInFormField(field, value) {
        const fieldPresent = await this.page.waitForSelector(
            selectors.fields[field]
        );
        await fieldPresent;
        await this.page.focus(selectors.fields[field]);
        await this.page.type(selectors.fields[field], value, {delay: 1});
        return;
    };

    async pressButton(buttonName) {
        return await this.page.click(selectors.buttons[buttonName]);
    };

}

module.exports = new Login();