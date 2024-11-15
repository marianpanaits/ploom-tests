import { test as base } from '@playwright/test';
import { Market, Markets } from '@/models/Market';

type MarketFixtures = {
    marketName: string;
    market: Market;
};

export const test = base.extend<MarketFixtures>({
    marketName: async ({ }, use, testInfo) => {
        const projectName = testInfo.project.name;
        if (!projectName) {
            throw new Error('Project name is not available');
        }

        const marketName = projectName.split(' ')[0];
        if (!Markets[marketName]) {
            throw new Error(`Invalid market name: ${marketName}`);
        }

        await use(marketName);
    },
    market: async ({ marketName }, use) => {
        await use(Markets[marketName]);
    },
});

export { expect } from '@playwright/test';