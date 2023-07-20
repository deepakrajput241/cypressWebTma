import { faker } from "@faker-js/faker";

it("Delete Weather record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Weather/Create");
  cy.openFlyoutAndSelectRandomValue("Station Code");
  cy.fillNumericTextBox(0, new Date().getFullYear());
  cy.fillNumericTextBox(1, faker.datatype.number(99999));
  cy.get("select[aria-label='Month']").select(
    new Date().toLocaleString("default", { month: "long" })
  );
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
