import { faker } from "@faker-js/faker";

it("Copy Inspection Form with required Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/GeneralInspectionForm");

  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.clickSaveAndCheckResponse();
});
