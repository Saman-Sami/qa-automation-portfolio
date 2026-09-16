const { test, expect, request } = require('@playwright/test');
const { productSchema, productsListResponseSchema } = require('../../utils/schemas');

test('Product List API Success Test', async({request}) => {
    const productResponse = await request.get('productsList');
    const respJson = await productResponse.json();
    //console.log(respJson);
    expect(productResponse.status()).toBe(200);
    const prodResponse = productsListResponseSchema.safeParse(respJson);
    //console.log(prodResponse);
    expect(prodResponse.success, JSON.stringify(prodResponse.error?.issues)).toBeTruthy();
})

test('Search Product Success Test', async({request}) => {
    const productResponse = await request.post('searchProduct', {
        form: {
            search_product: 'shirts'
        }
    });
    const respJson = await productResponse.json();
    //console.log(respJson);
    expect(productResponse.status()).toBe(200);
    const allProducts = respJson.products;
    expect(allProducts.length).toBeGreaterThan(0);

    //Reusing productsListResponseSchema since search products returns the same shape
    const prodResponse = productsListResponseSchema.safeParse(respJson);
    //console.log(prodResponse);
    expect(prodResponse.success, JSON.stringify(prodResponse.error?.issues)).toBeTruthy();

    //Check whether the results have relevancy to search
    const irrelevantProducts = allProducts.filter((item) => {
        //console.log(item.category.category);
        return !item.category.category.toLocaleLowerCase().includes('shirt');
    });
    //console.log(irrelevantProducts);
    expect(irrelevantProducts,`Irrelevant items found: ${JSON.stringify(irrelevantProducts)}`).toEqual([]);
})

test('Incorrect Method Check', async({request}) => {
    const productResponse = await request.post('productsList');
    const respJson = await productResponse.json();
    
    //API quirk: returns 200 status code for unsupported method (POST) instead of 405.
    //The error is communicated through the responseCode present in the body, not the HTTP status itself.
    expect(productResponse.status()).toBe(200);
    expect(respJson.responseCode).toBe(405);
})