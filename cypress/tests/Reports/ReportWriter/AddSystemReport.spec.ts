import { faker } from "@faker-js/faker";

it("Create Existing System Report", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");
  cy.EditInputElement("RptTitle", faker.datatype.number(999999));
  cy.fillCombobox("Report Form", "Accounts");
  cy.openFlyoutAndSelectRandomValue("Access by Repair Center");
  cy.openFlyoutAndSelectRandomValue("Report Category");
  cy.fillCombobox("Window Toolbar", "Accounts");
  cy.fillTextarea("Comments", `${faker.random.words(25)}`);
  cy.wait(2000);
  cy.get("#lnkAddCriteria").click();
  cy.wait(2000);
  cy.get("select[ng-model='dataItem.searchFieldId']").select("Account #");
  cy.get("select[ng-model='dataItem.searchOperatorId']").select("is not empty");
  cy.clickSaveAndCheckResponse();
});
