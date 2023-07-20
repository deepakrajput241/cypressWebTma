import { faker } from "@faker-js/faker";

const data = { amount: "100" };

it("Copy CEAR Records", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Seer/Create");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.fillNumericTextBox(0, data.amount);
  cy.fillDateInput("Award Date");
  cy.clickSaveAndCheckResponse();
});
