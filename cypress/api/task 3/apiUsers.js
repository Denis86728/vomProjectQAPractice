export default class ApiUsers {
    getUserByName(username){
        cy.request({
            method: "GET",
            url: `${Cypress.env("urls").task3}/users?username=${username}`,
          }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.statusText).to.eq("OK");
            expect(res.body[0].username).to.eq(username);
          });
    }
}