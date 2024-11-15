import { PlaywrightTestConfig } from '@playwright/test';
import { Markets } from '@/models/Market';

const config: PlaywrightTestConfig = {
    testDir: './src/tests',
    timeout: 40000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: Object.entries(Markets).map(([marketName, market]) => ({
        name: `${marketName} Tests`,
        use: {
            baseURL: market.baseUrl,
        },
    })),
};

export default config;