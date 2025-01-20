export default class BankingManagerMainPage {
  getBankManagerActionByIndex(indexAction) {
    return cy.get(`button[ng-class="btnClass${indexAction}"]`);
  }
}
