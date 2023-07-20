import { faker } from "@faker-js/faker";

it("Copy Lock", { tags: ["@smoke"] }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lock");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.fillCombobox("Key #", 1);
  cy.EditInputElement("Number", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
