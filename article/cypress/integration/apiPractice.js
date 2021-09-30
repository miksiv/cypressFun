const usersApiUrl = 'https://reqres.in/api/users';
const userName = 'Alex';
const job = 'QA';
const userData = {
    "data": {
        "id": 2,
        "email": "janet.weaver@reqres.in",
        "first_name": "Janet",
        "last_name": "Weaver",
        "avatar": "https://reqres.in/img/faces/2-image.jpg"
    },
    "support": {
        "url": "https://reqres.in/#support-heading",
        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
    }
};

describe('Cypress API tests', function () {
    it('Create a new user', function () {
        cy.request({
            url: `${usersApiUrl}`,
            method: 'POST',
            body: {
                "name": userName,
                "job": job
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
                expect(res.status).to.eq(201);
                expect(res.body.name).to.eq(userName);
                expect(res.body.job).to.eq(job);
                cy.wrap(res.body.id).as('userId');
            });
    });

    it('Read the user', function () {
        cy.request(`${usersApiUrl}/2`).then((res) => {
            expect(res.body).to.deep.eq(userData)
        })
    });

    it('Read the user collection', function () {
        cy.request(`${usersApiUrl}/?page=2`)
            .its('body.data')
            .each(value => {
                expect(value).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
            });
    });
})