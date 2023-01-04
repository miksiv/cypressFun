import {WebSocketHandler} from "../support/helpers/wsHelper";
import {socketsbay} from "../pages/socketsbay";

describe('Test websockets message', () => {
    const ws = new WebSocketHandler('wss://socketsbay.com/wss/v2/1/demo/')
    it('Generate WebSocket messages', function () {
        cy.visit('https://socketsbay.com/test-websockets')
        cy.get(socketsbay.connectBtn).click()
        cy.wrap(ws.assertState(), {timeout: 15000}).then((r) => {
            expect(r).to.be.true
        })
        cy.get(socketsbay.messageInput).clear().type('123');
        cy.get(socketsbay.sendBtn).click();
    });

    it('Assert WS messages', function () {
        ws.assertMessages()
    });
})