import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShopPage extends BasePage {
    constructor(protected page: Page, marketName?: string) {
        super(page, marketName);
    }

    async handleModals() {
        try {
            // First handle cookie consent if present
            const cookieButton = await this.page.waitForSelector('#onetrust-accept-btn-handler', {
                timeout: 5000,
                state: 'visible'
            });
            if (cookieButton) {
                await cookieButton.click();
                await this.page.waitForTimeout(1000);
            }

            // Then handle age verification
            const ageButton = await this.page.waitForSelector(
                this.getSelector('ageVerificationButton'), {
                    timeout: 5000,
                    state: 'visible'
                }
            );

            if (ageButton) {
                await ageButton.click();
                await this.page.waitForTimeout(1000);
            }
        } catch (e) {
            console.log('Some modals were not found or already handled:', e);
        }
    }

    async navigateToProductByName(sku: string) {
        await this.page.waitForSelector(`[data-sku="${sku}"] .aem-productTeaserComponent__link`, {
            state: 'visible',
            timeout: 10000
        });

        await this.page.click(`[data-sku="${sku}"] .aem-productTeaserComponent__link`);
    }

    async navigateToShop() {
        await this.page.goto(this.market.shopPath);
        await this.waitForPageLoad();
        await this.handleModals();
    }

    async getAllProductImages(): Promise<string[]> {
        return await this.page.evaluate(() => {
            const images = document.querySelectorAll('.productdetail img');

            return Array.from(images)
                .map(img => img as HTMLImageElement)
                .filter(img => img.src.toLowerCase().endsWith('.png'))
                .map(img => img.src);
        });
    }

    async getAllLinks(): Promise<string[]> {
        return await this.page.evaluate(() => {
            const links = document.querySelectorAll('a');
            return Array.from(links)
                .map(link => link.href)
                .filter(href =>
                    href.startsWith('http') ||
                    href.startsWith('https')
                )
                .filter((href, index, self) =>
                    self.indexOf(href) === index
                )
                .filter(href => href && href !== 'javascript:void(0)');
        });
    }
}