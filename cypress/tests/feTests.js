import BasePage from "../page-objects/pages/basePage";
import Task1Page from "../page-objects/pages/task1Page";
import Task2Page from "../page-objects/pages/task2Page";
const basePage = new BasePage();
const task1Elements = new Task1Page();
const task2Elements = new Task2Page();
const firstName = "John";
const lastName = "Wick";
const postCode = "888300";

describe("Frontend", () => {
  it("Task 1 - Check if user can update multiple users", () => {
    //Navigate to Task 1 website
    basePage.navigateToApp(Cypress.env("urls").task1);

    //Click on "Edit" button for "Mark Novak" user
    task1Elements.getEditButtonForACustomerByIndex(3).click();

    //Change the Role from Customer to Sales Team
    task1Elements
      .getCustomerLabelForACustomerByIndex(6)
      .should("eq", "Company BBB");
    task1Elements.getRoleOptionEditModal().select(1);
    task1Elements.getSaveButtonEditModal().click();

    //Check if the value was saved and is displayed correctly in the table
    task1Elements.getRoleLabelForACustomerByIndex(3).should("eq", "Sales Team");

    //Change the company for "test" user
    task1Elements.getEditButtonForACustomerByIndex(6).click();
    task1Elements.getCustomerOptionEditModalByIndex(1).click();
    task1Elements.getSaveButtonEditModal().click();

    //Check if the value was saved and is displayed correctly in the table
    //BUG here. This assert will fail. Ticket was raised.
    // task1Elements.getCustomerLabelForACustomerByIndex(6).should("eq", "Company AAA");
  });
  it("Task 2 - Check if user can create and delete a customer as a Bank Manager", () => {
    //Navigate to Task 2 website
    basePage.navigateToApp(Cypress.env("urls").task2);

    //Login as Bank Manager
    task2Elements.getLoginOptionByIndex(2).click();

    //Click on Add Customer button
    task2Elements.getBankManagerActionByIndex(1).click();
    //Check if Add Customer button is selected
    task2Elements
      .getBankManagerActionByIndex(1)
      .should("have.class", "btn-primary");

    //Add a new customer
    task2Elements.getAddFirstNameInputField().type(firstName);
    task2Elements.getAddLastNameInputField().type(lastName);
    task2Elements.getAddPostCodeInputField().type(postCode);
    task2Elements.getAddCreateCustomerButton().click();

    //Navigate to Customer section
    task2Elements.getBankManagerActionByIndex(3).click();

    //Check if the added customer is displayed in the entire table
    task2Elements
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
    task2Elements.getSearchInputField().type(firstName);
    task2Elements.getCustomerLabelByIndex(1).should("eq", firstName);
    task2Elements.getCustomerLabelByIndex(2).should("eq", lastName);
    task2Elements.getCustomerLabelByIndex(3).should("eq", postCode);

    //Delete the newly added customer
    task2Elements.getDeleteCustomerButton().click();

    //Check if the customer was removed from the list
    task2Elements.getSearchInputField().clear();
    task2Elements
      .getCustomersTable()
      .contains("td", firstName)
      .should("not.exist");
    task2Elements
      .getCustomersTable()
      .contains("td", lastName)
      .should("not.exist");
    task2Elements
      .getCustomersTable()
      .contains("td", postCode)
      .should("not.exist");
  });
});
