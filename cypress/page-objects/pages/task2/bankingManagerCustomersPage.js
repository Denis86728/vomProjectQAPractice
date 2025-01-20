export default class BankingManagerCustomersPage {
  getSearchInputField() {
    return cy.get('input[ng-model="searchCustomer"]');
  }
  getCustomerLabelByIndex(indexLabelCustomer) {
    return cy
      .get(`tr[ng-repeat] > .ng-binding:nth-child(${indexLabelCustomer})`)
      .invoke("text");
  }
  getDeleteCustomerButton() {
    return cy.get('button[ng-click="deleteCust(cust)"]');
  }
  getCustomersTable() {
    return cy.get("table");
  }
}
