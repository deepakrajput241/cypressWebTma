import { faker } from "@faker-js/faker";

it("Delete Utility Ticket record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/UtilityTicket/Create");
  cy.get("input[aria-label='Billing Start Date']").type(
    new Date().toLocaleDateString("en-US")
  );
  cy.get("input[aria-label='Billing End Date']").type(
    faker.date.future().toLocaleDateString("en-US")
  );
  cy.openFlyoutAndSelectRandomValue("Utility Meter");
  cy.fillNumericTextBox(0, faker.datatype.number(100));
  cy.fillNumericTextBox(2, faker.datatype.number(999));
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.clickDeleteAndCheckResponse();
});
