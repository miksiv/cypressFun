export class WebSocketHandler {
    messages;
    ws;

    constructor(url) {
        this.messages = []
        this.ws = new WebSocket(url)
        this.createListener(this.ws)
    }

    createListener(ws) {
        ws.addEventListener('message', (event) => {
            this.messages.push(event.data)
            console.log('Message from WebSocket: ', event.data);
        });
    }

    assertState(timeout = 5000, times = 3) {
        return new Cypress.Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.ws.readyState === WebSocket.OPEN) {
                    return resolve(true)
                }
                if (times) {
                    this.assertState()
                    times--
                } else {
                    return reject(false)
                }
            }, timeout)

        })

    }

    assertMessages() {
        expect(this.messages).not.empty
    }
}

