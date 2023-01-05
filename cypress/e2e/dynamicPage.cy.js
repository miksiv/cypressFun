import {nasdaqPage} from "../pages/nasdaq";
import * as schema from '../fixtures/stockAssetSchema.json'
describe('A test against a page with dynamic content', () => {
    it('Navigate to an AAPL stock Nasdaq page and validate the last sale price', function () {
        cy.intercept('api/quote/AAPL/info?assetclass=stocks').as('pricingInfo')
        cy.intercept('https://cdn.cookielaw.org/scripttemplates/**', req => {
            req.destroy();
        })
        cy.visit('https://www.nasdaq.com/market-activity/stocks/aapl/', {headers: {"Accept-Encoding": "gzip, deflate"}})
        cy.wait('@pricingInfo').then(res => {
            cy.clock()
            cy.get(nasdaqPage.price).should('include.text', res.response.body.data.primaryData.lastSalePrice)
            cy.get(nasdaqPage.priceChange).should('include.text', res.response.body.data.primaryData.netChange)
            cy.get(nasdaqPage.priceChangePercent).should('include.text', res.response.body.data.primaryData.percentageChange)
            expect(res.response.body).to.be.jsonSchema(schema)
        })
    });
})