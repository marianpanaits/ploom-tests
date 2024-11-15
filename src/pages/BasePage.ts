import { Page } from '@playwright/test';
import { Market, Markets } from '@/models/Market';
import { detectMarketFromUrl } from '@/utils/marketDetector';

export class BasePage {
    protected market: Market;

    constructor(protected page: Page, marketName?: string) {
        if (marketName) {
            if (!Markets[marketName]) {
                throw new Error(`Invalid market name: ${marketName}`);
            }
            this.market = Markets[marketName];
        } else {
            const url = page.url();
            this.market = url === 'about:blank' ? Markets.UK : detectMarketFromUrl(url);
        }
    }

    protected async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    protected getSelector(key: keyof Market['selectors']): string {
        return this.market.selectors[key];
    }

    async checkImageLoaded(selector: string): Promise<boolean> {
        return this.page.evaluate((selector) => {
            const img = document.querySelector(selector) as HTMLImageElement;
            return img ? img.complete && img.naturalWidth > 0 : false;
        }, selector);
    }

    async checkLinkValid(url: string): Promise<boolean> {
        try {
            const response = await this.page.request.head(url);
            return response.status() === 200;
        } catch {
            return false;
        }
    }
}