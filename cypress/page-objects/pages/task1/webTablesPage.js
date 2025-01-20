export default class WebTablesPage {
  //Table locators
  getEditButtonForACustomerByIndex(indexCustomer) {
    return cy.get(
      `.smart-table-data-row:nth-child(${indexCustomer}) button[type="Edit"]`
    );
  }
  getRoleLabelForACustomerByIndex(indexCustomer) {
    return cy
      .get(
        `.smart-table-data-row.ng-scope:nth-child(${indexCustomer}) > .smart-table-data-cell:nth-child(6)`
      )
      .invoke("text");
  }
  getCustomerLabelForACustomerByIndex(indexCustomer) {
    return cy
      .get(
        `.smart-table-data-row.ng-scope:nth-child(${indexCustomer}) > .smart-table-data-cell:nth-child(5)`
      )
      .invoke("text");
  }
  //Edit user modal locators
  getRoleOptionEditModal() {
    return cy.get('select[name="RoleId"]');
  }
  getCustomerOptionEditModalByIndex(indexWorkCustomer) {
    return cy.get(`.radio.ng-scope.ng-binding:nth-child(${indexWorkCustomer})`);
  }
  getCloseButtonEditModal() {
    return cy.get(".btn.btn-danger");
  }
  getSaveButtonEditModal() {
    return cy.get(".btn.btn-success");
  }
}
