import { faker } from "@faker-js/faker";
const data = { amount: "100" };

it("Edit CEAR Records", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Seer/Create");
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.fillNumericTextBox(0, data.amount);
  cy.fillDateInput("Award Date");
  cy.clickSaveAndCheckResponse();

  cy.getButton("Edit").click();
  cy.EditInputElement("Number", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAfterEditAndCheckResponse();
});
