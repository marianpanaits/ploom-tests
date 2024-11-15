// src/models/Market.ts
export interface Market {
    baseUrl: string;
    locale: string;
    currency: string;
    shopPath: string;
    selectors: {
        addToCart: string;
        basketCount: string;
        basketIcon: string;
        removeButton: string;
        cartItem: string;
        cart: string;
        ageVerificationButton: string;
    };
    expectedTexts: {
        addToCartButton: string;
    };
}

export const Markets: { [key: string]: Market } = {
    UK: {
        baseUrl: 'https://www.ploom.co.uk',
        locale: 'en-GB',
        currency: 'GBP',
        shopPath: '/en/shop',
        selectors: {
            addToCart: '[data-testid="pdpAddToProduct"]',
            basketCount: 'div.mini-cart__icon-label',
            basketIcon: '[data-testid="cartIcon"]',
            removeButton: '[data-testid="cartRemoveButton"]',
            cartItem: '[data-test-id="cart-item"]',
            cart: '[class="mini-cart__container"]',
            ageVerificationButton: 'div.ageconfirmation__actionWrapper >> span.aem-button__link'
        },
        expectedTexts: {
            addToCartButton: 'Add to Cart'
        }
    },
    PL: {
        baseUrl: 'https://www.ploom.pl',
        locale: 'pl-PL',
        currency: 'PLN',
        shopPath: '/pl/sklep',
        selectors: {
            addToCart: '[data-testid="pdpAddToProduct"]',
            basketCount: 'div.mini-cart__icon-label',
            basketIcon: '[data-testid="cartIcon"]',
            removeButton: '[data-testid="cartRemoveButton"]',
            cartItem: '[data-test-id="cart-item"]',
            cart: '[class="mini-cart__container"]',
            ageVerificationButton: 'div.ageconfirmation__actionWrapper >> span.aem-button__link'
        },
        expectedTexts: {
            addToCartButton: 'Dodaj do koszyka'
        }
    }
};