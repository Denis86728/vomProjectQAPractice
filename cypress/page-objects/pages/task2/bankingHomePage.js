export default class BankingHomePage {
  //Home page locators
  getLoginOptionByIndex(indexLoginButton) {
    return cy.get(`.btn.btn-primary.btn-lg`).eq(indexLoginButton);
  }
}
