import { faker } from "@faker-js/faker";

it("Copy Part record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Part");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.get("input[aria-label='What is a Part ?']").type(faker.random.words(2));
  cy.get("input[aria-label='2nd MFG']").type(faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
