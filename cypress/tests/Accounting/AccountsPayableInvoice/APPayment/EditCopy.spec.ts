import { faker } from "@faker-js/faker";

// TODO: it is not clear that this edit is doing anything
it("edit AP Payment", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/APPayment");
  cy.contains("Edit").click();
  cy.get("input[ng-model='dataItem.PaymentAmount']").type(
    faker.finance.amount()
  );
  cy.clickSaveAndCheckResponse();
});

// there is no copy function for AP Payment
