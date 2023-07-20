import { faker } from "@faker-js/faker";

it("Delete Custodial Template Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CDTemplateType/Create/Identity");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
