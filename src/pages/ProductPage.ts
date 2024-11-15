import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    constructor(protected page: Page, marketName?: string) {
        super(page, marketName);
    }

    async addToCart() {
        const addToCartButton = this.getSelector('addToCart');
        await this.page.waitForSelector(addToCartButton);
        await this.page.click(addToCartButton);
    }

    async getBasketCount(): Promise<number> {
        const countText = await this.page.textContent(this.getSelector('basketCount'));
        return parseInt(countText || '0', 10);
    }
}