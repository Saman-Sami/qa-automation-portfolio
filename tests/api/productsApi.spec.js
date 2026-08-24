const { test, expect, request } = require('@playwright/test');

test('Product List API Success Test', async({request}) => {
    const productResponse = await request.get('productsList');
    const respJson = await productResponse.json();
    console.log(respJson);
    expect(productResponse.status()).toBe(200);
    expect(respJson.responseCode).toBe(200);
    expect.soft(Array.isArray(respJson.products)).toBeTruthy();
    const arr = respJson.products;
    expect.soft(arr.length).toBeGreaterThan(0);
    expect.soft(arr[0].id).toBeDefined();
    expect.soft(arr[0].price).toBeDefined();
    expect.soft(arr[0].brand).toBeDefined();
    expect.soft(arr[0].category).toBeInstanceOf(Object);
    const obj = arr[0].category;
    expect.soft(obj.usertype).toBeInstanceOf(Object);
    expect.soft(obj.usertype.usertype).toBeDefined();
    expect.soft(obj.category).toBeDefined();
    /*arr.forEach(element => {
        expect.soft(element.id).toBeDefined();
        expect.soft(element.price).toBeDefined();
    });*/
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
    expect(respJson.responseCode).toBe(200);
    const allProducts = respJson.products;
    expect(allProducts).toBeDefined();
    expect(allProducts.length).toBeGreaterThan(0);

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