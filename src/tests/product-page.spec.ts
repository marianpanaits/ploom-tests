import { test, expect } from '@/fixtures/market';
import { ShopPage } from '@/pages/ShopPage';

const TEST_SKU = 'ploom-x-advanced';

test.describe('Product page integrity', () => {
    test('should not have broken links or images', async ({ page, marketName }) => {
        const shopPage = new ShopPage(page, marketName);
        await shopPage.navigateToShop();
        await shopPage.navigateToProductByName(TEST_SKU);

        // Check all images
        const images = await shopPage.getAllProductImages();

        for (const imgSrc of images) {
            expect(
                await shopPage.checkImageLoaded(`img[src="${imgSrc}"]`),
                `Image ${imgSrc} failed to load`
            ).toBeTruthy();
        }

        // Check all links
        const links = await shopPage.getAllLinks();
        for (const link of links) {
            expect(
                await shopPage.checkLinkValid(link),
                `Link ${link} is broken`
            ).toBeTruthy();
        }
    });
});