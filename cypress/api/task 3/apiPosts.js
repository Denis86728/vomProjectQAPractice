export default class ApiPosts {
  addPost(userId, title, body) {
    cy.request({
      method: "POST",
      url: `${Cypress.env("urls").task3}/posts`,
      body: {
        userId: userId,
        title: title,
        body: body,
      },
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.statusText).to.eq("Created");
    });
  }
  checkApiThresholdForPostComments(thresholdTimeResponse) {
    cy.request({
      method: "GET",
      url: `${Cypress.env("urls").task3}/posts/4/comments`,
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.statusText).to.eq("OK");
      if (expect(res.duration).to.be.lessThan(thresholdTimeResponse)) {
        cy.log(
          `The API response time ${res.duration} milliseconds didn't exceed the threshold of ${thresholdTimeResponse} milliseconds`
        );
      }
    });
  }
}
