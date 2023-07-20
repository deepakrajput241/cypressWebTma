import { faker } from "@faker-js/faker";

it("Delete Customer Survey Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/Survey/Create");
  cy.editTextarea("Question", faker.random.words(5));
  cy.fillCheckbox("Work Order");
  cy.selectRadioBtnById("QuestionType-0");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.clickDeleteAndCheckResponse();
});
