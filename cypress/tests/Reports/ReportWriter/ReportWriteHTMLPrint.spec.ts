import { faker } from "@faker-js/faker";

it("View Report Writer to add HTML Print", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Report/Create");

  cy.EditInputElement("RptTitle", faker.datatype.number(99999));
  cy.fillCombobox("Report Form", "Account Types");
  cy.fillTextarea("Comments", `Auto test${faker.random.words(2)}`);
  cy.openFlyoutAndSelectRandomValue("Report Category");
  cy.wait(2000);
  cy.get("#lnkAddCriteria").click().wait(2000);
  cy.get("select[ng-model='dataItem.searchOperatorId']").select("is true");
  cy.clickSaveAndCheckResponse();

  cy.getButton("Print").click();
  cy.get("a[aria-label='HTML']").click();
});
