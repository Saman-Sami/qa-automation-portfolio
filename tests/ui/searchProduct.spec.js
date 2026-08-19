const { test, expect } = require('../../fixtures/baseFixtures');
const { ProductsPage } = require('../../pages/ProductsPage');

test('Enter Valid Search Item', {
    annotation: {
        type: 'testcase',
        description: 'Product_TC_01'
    }
}, async({ page }) => {

    const productPage = new ProductsPage(page);
    await productPage.gotoProductsPage();
    await productPage.searchProduct('shirts');
    await expect(page.locator(productPage.searchResultHeading)).toBeVisible();
    expect(await page.locator(productPage.productsList).count()).toBeGreaterThan(0);
})

test('Check Relevancy of the Searched Item', {
    annotation: {
        type: 'testcase',
        description: 'Product_TC_02'
    }
}, async({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.gotoProductsPage();
    await productPage.searchProduct('shirts');
    //console.log(await page.locator(productPage.productsList).allTextContents())
    let textDescriptions = await page.locator(productPage.productsList).allTextContents();
    expect(textDescriptions.some((item) => item.toLocaleLowerCase().includes('shirt'))).toBeTruthy();
})

test('Enter Random Search Item /Wordings', {
    annotation: {
        type: 'testcase',
        description: 'Product_TC_03'
    }
}, async({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.gotoProductsPage();
    await productPage.searchProduct('ajhjdahdjhfhgyehbeh');
    await expect(page.locator(productPage.searchResultHeading)).toBeVisible();
    expect(await page.locator(productPage.productsList).count()).toBe(0);
})

test('Check Keyboard Enter works on the search', {
    annotation: {
        type: 'testcase',
        description: 'Product_TC_06'
    }
}, async({ page }) => {
    test.fail();   //Pressing Enter doesn't trigger search on the site
    const productPage = new ProductsPage(page);
    await productPage.gotoProductsPage();
    await page.locator(productPage.searchBarId).fill('tops');
    await page.keyboard.press('Enter');
    await expect.soft(page.locator(productPage.searchResultHeading)).toBeVisible();
    expect(page.url().endsWith('?search=tops')).toBeTruthy();
})