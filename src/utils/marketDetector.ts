import { Market, Markets } from '@/models/Market';

export function detectMarketFromUrl(url: string): Market {
    if (url.includes('ploom.co.uk')) {
        return Markets.UK;
    } else if (url.includes('ploom.pl')) {
        return Markets.PL;
    }

    if (url === 'about:blank') {
        return Markets.UK;
    }
    throw new Error(`Unable to detect market for URL: ${url}`);
}