export default class Task2Page {
  //Home page locators
  getLoginOptionByIndex(indexLoginButton) {
    return cy.get(`.btn.btn-primary.btn-lg`).eq(indexLoginButton);
  }
  //Bank Manager option locators
  getBankManagerActionByIndex(indexAction) {
    return cy.get(`button[ng-class="btnClass${indexAction}"]`);
  }
  getAddFirstNameInputField() {
    return cy.get('input[ng-model="fName"]');
  }
  getAddLastNameInputField() {
    return cy.get('input[ng-model="lName"]');
  }
  getAddPostCodeInputField() {
    return cy.get('input[ng-model="postCd"]');
  }
  getAddCreateCustomerButton() {
    return cy.get(".btn-default");
  }
  //Customers option locators
  getSearchInputField() {
    return cy.get('input[ng-model="searchCustomer"]');
  }
  getCustomerLabelByIndex(indexLabelCustomer) {
    return cy
      .get(`tr[ng-repeat] > .ng-binding:nth-child(${indexLabelCustomer})`)
      .invoke("text");
  }
  getDeleteCustomerButton(){
    return cy.get('button[ng-click="deleteCust(cust)"]');
  }
  getCustomersTable(){
    return cy.get("table");
  }
}
