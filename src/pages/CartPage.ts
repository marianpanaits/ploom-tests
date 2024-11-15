import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(protected page: Page, marketName?: string) {
        super(page, marketName);
    }

    async removeProduct(sku: string) {
        const removeButton = this.page
            .locator(`.mini-cart__items-container`)
            .locator(`a[href*="${sku}"]`)
            .locator('xpath=ancestor::div[contains(@class, "Card-module-content")]')
            .locator('[data-testid="cartRemoveButton"]');

        await removeButton.waitFor({ state: 'visible', timeout: 5000 });
        await removeButton.click();
        await removeButton.waitFor({
            state: 'detached',
            timeout: 5000
        });
    }

    async isCartOpen(): Promise<boolean> {
        const cartSelector = this.getSelector('cart');
        const miniCart = await this.page.waitForSelector(cartSelector, {
            state: 'visible',
            timeout: 5000
        });

        return miniCart.isVisible();
    }

    async openBasket() {
        if(!await this.isCartOpen()) {
            await this.page.click(this.getSelector('basketIcon'));
        }
    }

    async isProductInCart(sku: string): Promise<boolean> {
        const cartSelector = this.getSelector('cart');

        const cart = await this.page.waitForSelector(cartSelector, {
            state: 'visible',
            timeout: 5000
        });

        if (!cart) {
            return false;
        }

        const productsCount = await this.page.locator(cartSelector).locator(`a[href*="${sku}"]`).count();
        return productsCount > 0;
    }
}