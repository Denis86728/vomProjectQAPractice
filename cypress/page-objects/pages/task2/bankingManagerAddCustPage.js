export default class BankingManagerAddCustPage {
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
}
