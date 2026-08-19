class ProductsPage{
    constructor(page){
        this.page = page;
        this.productHeading = '//h2[normalize-space()="All Products"]';
        this.searchResultHeading = '//h2[normalize-space()="Searched Products"]';
        this.productsList = '//div[@class="product-image-wrapper"]';
        this.searchBarId = '#search_product';
        this.searchButtonId = '#submit_search';
        this.viewProductOption = '(//div[@class="choose"])';
    }

    async gotoProductsPage(){
        await this.page.goto('https://www.automationexercise.com/products');
    }

    async searchProduct(item){
        await this.page.locator(this.searchBarId).fill(item);
        await this.page.locator(this.searchButtonId).click();
    }
}

exports.ProductsPage = ProductsPage;