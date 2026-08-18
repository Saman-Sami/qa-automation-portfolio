class LoginPage {

    constructor(page){
        this.page = page;
        this.emailTestId = 'login-email';
        this.passwordTestId = 'login-password';
        this.loginButtonTestId = 'login-button';
        this.loginError = '//p[normalize-space()="Your email or password is incorrect!"]';
        this.logoutLink = '//a[normalize-space()="Logout"]';
    }

    async gotoLoginPage(){
        await this.page.goto('https://www.automationexercise.com/login');
    }

    async login(email, password){
        await this.page.getByTestId(this.emailTestId).fill(email);
        await this.page.getByTestId(this.passwordTestId).fill(password);
        await this.page.getByTestId(this.loginButtonTestId).click();
    }

    async getEmailValidity() {
        const isValid = await this.page.getByTestId(this.emailTestId).evaluate(el => el.checkValidity());
        return isValid;
    }

    async getFieldsFillValidation(){
        const message = await this.page.getByTestId(this.emailTestId).evaluate(el => el.validationMessage);
        return message;
    }

}

exports.LoginPage = LoginPage;