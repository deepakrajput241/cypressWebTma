import { faker } from "@faker-js/faker";
const data = { amount: "100" };

it("Delete CEAR Record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Seer/Create/Identity");
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.fillNumericTextBox(0, data.amount);
  cy.fillDateInput("Award Date");
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
