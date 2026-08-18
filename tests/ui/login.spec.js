const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { createTestUser, deleteTestUser } = require('../../utils/testUserUtils');

let testUser;

test.beforeAll(async({request}) => {
    testUser = await createTestUser(request);
})

test.afterAll(async({request}) => {
    let userDelete = await deleteTestUser(request, testUser.email, testUser.password);
    if(!userDelete){
        console.warn('User Deletion Failed!')
    }
})

test('Valid Credentials', {
    annotation: {
        type: 'testcase',
        description: 'Login_TC_01'
    }
}, async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login(testUser.email, testUser.password);
    //let emailValid = loginPage.getEmailValidity();
    //await expect(emailValid).toBeTruthy();
    await expect(await page.locator(loginPage.logoutLink)).toBeVisible();
} )

test('Invalid Credentials', {
    annotation: {
        type: 'testcase',
        description: 'Login_TC_02'
    }
}, async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login('sana@gmail.com', '123');
    await expect(await page.locator(loginPage.loginError)).toHaveText('Your email or password is incorrect!');
})

test('Invalid Email', {
    annotation: {
        type: 'testcase',
        description: 'Login_TC_04'
    }
}, async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login('sanagmail.com', '123');
    let emailValidity = await loginPage.getEmailValidity();
    expect(emailValidity).toBeFalsy();

})

test('Empty Fields', {
    annotation: {
        type: 'testcase',
        description: 'Login_TC_05'
    }
}, async({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();

    await loginPage.login(' ', ' ');
    let validationMessage = await loginPage.getFieldsFillValidation();
    expect(validationMessage).not.toBe('');

} )