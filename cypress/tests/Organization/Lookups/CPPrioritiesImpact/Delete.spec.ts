import { faker } from "@faker-js/faker";

it("Delete CP Priorities record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CPImpact/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Description", faker.random.words(6));
  cy.get("select[name='Level']").select(2);
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
