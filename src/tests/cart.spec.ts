import { test, expect } from '@/fixtures/market';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';
import { CartPage } from '@/pages/CartPage';
const TEST_SKU = 'ploom-x-advanced';

test.describe('Cart functionality', () => {
    test('should add product to cart', async ({ page, marketName }) => {
        const shopPage = new ShopPage(page, marketName);
        const productPage = new ProductPage(page, marketName);

        await shopPage.navigateToShop();
        await shopPage.navigateToProductByName(TEST_SKU);

        // Verify add to cart
        await productPage.addToCart();
        const basketCount = await productPage.getBasketCount();
        expect(basketCount).toBe(1);

        // Verify product in cart
        const cartPage = new CartPage(page, marketName);
        await cartPage.openBasket();
        expect(await cartPage.isProductInCart(TEST_SKU)).toBeTruthy();
    });

    test('should remove product from cart', async ({ page, marketName }) => {
        const shopPage = new ShopPage(page, marketName);
        const productPage = new ProductPage(page, marketName);
        const cartPage = new CartPage(page, marketName);

        // Add product to cart
        await shopPage.navigateToShop();
        await shopPage.navigateToProductByName(TEST_SKU);
        await productPage.addToCart();

        // Remove product and verify
        await cartPage.openBasket();
        await cartPage.removeProduct(TEST_SKU);

        expect(await cartPage.isProductInCart(TEST_SKU)).toBeFalsy();
    });
});