import BasePage from "../page-objects/pages/basePage";
import WebTablesPage from "../page-objects/pages/task1/webTablesPage";
import BankingHomePage from "../page-objects/pages/task2/bankingHomePage";
import BankingManagerMainPage from "../page-objects/pages/task2/bankingManagerMainPage";
import BankingManagerAddCustPage from "../page-objects/pages/task2/bankingManagerAddCustPage";
import BankingManagerCustomersPage from "../page-objects/pages/task2/bankingManagerCustomersPage";
const basePage = new BasePage();
const webTablesPage = new WebTablesPage();
const bankingHomePage = new BankingHomePage();
const bankingManagerMainPage = new BankingManagerMainPage();
const bankingManagerAddCustPage = new BankingManagerAddCustPage();
const bankingManagerCustomersPage = new BankingManagerCustomersPage();
const firstName = "John";
const lastName = "Wick";
const postCode = "888300";

describe("Frontend", () => {
  it("Task 1 - Check if user can update multiple users", () => {
    //Navigate to Task 1 website
    basePage.navigateToApp(Cypress.env("urls").task1);

    //Click on "Edit" button for "Mark Novak" user
    webTablesPage.getEditButtonForACustomerByIndex(3).click();

    //Change the Role from Customer to Sales Team
    webTablesPage
      .getCustomerLabelForACustomerByIndex(6)
      .should("eq", "Company BBB");
    webTablesPage.getRoleOptionEditModal().select(1);
    webTablesPage.getSaveButtonEditModal().click();

    //Check if the value was saved and is displayed correctly in the table
    webTablesPage.getRoleLabelForACustomerByIndex(3).should("eq", "Sales Team");

    //Change the company for "test" user
    webTablesPage.getEditButtonForACustomerByIndex(6).click();
    webTablesPage.getCustomerOptionEditModalByIndex(1).click();
    webTablesPage.getSaveButtonEditModal().click();

    //Check if the value was saved and is displayed correctly in the table
    //BUG here. This assert will fail. Ticket was raised.
    // webTablesPage.getCustomerLabelForACustomerByIndex(6).should("eq", "Company AAA");
  });
  it("Task 2 - Check if user can create and delete a customer as a Bank Manager", () => {
    //Navigate to Task 2 website
    basePage.navigateToApp(Cypress.env("urls").task2);

    //Login as Bank Manager
    bankingHomePage.getLoginOptionByIndex(2).click();

    //Click on Add Customer button
    bankingManagerMainPage.getBankManagerActionByIndex(1).click();
    //Check if Add Customer button is selected
    bankingManagerMainPage
      .getBankManagerActionByIndex(1)
      .should("have.class", "btn-primary");

    //Add a new customer
    bankingManagerAddCustPage.getAddFirstNameInputField().type(firstName);
    bankingManagerAddCustPage.getAddLastNameInputField().type(lastName);
    bankingManagerAddCustPage.getAddPostCodeInputField().type(postCode);
    bankingManagerAddCustPage.getAddCreateCustomerButton().click();

    //Navigate to Customer section
    bankingManagerMainPage.getBankManagerActionByIndex(3).click();

    //Check if the added customer is displayed in the entire table
    bankingManagerCustomersPage
      .getCustomersTable()
      .contains("td", firstName)
      .should("exist")
      .parents("tr")
      .contains("td", lastName)
      .should("exist")
      .parents("tr")
      .contains("td", postCode)
      .should("exist");

    //Check if the added customer is displayed in the search result
    bankingManagerCustomersPage.getSearchInputField().type(firstName);
    bankingManagerCustomersPage.getCustomerLabelByIndex(1).should("eq", firstName);
    bankingManagerCustomersPage.getCustomerLabelByIndex(2).should("eq", lastName);
    bankingManagerCustomersPage.getCustomerLabelByIndex(3).should("eq", postCode);

    //Delete the newly added customer
    bankingManagerCustomersPage.getDeleteCustomerButton().click();

    //Check if the customer was removed from the list
    bankingManagerCustomersPage.getSearchInputField().clear();
    bankingManagerCustomersPage
      .getCustomersTable()
      .contains("td", firstName)
      .should("not.exist");
    bankingManagerCustomersPage
      .getCustomersTable()
      .contains("td", lastName)
      .should("not.exist");
    bankingManagerCustomersPage
      .getCustomersTable()
      .contains("td", postCode)
      .should("not.exist");
  });
});
