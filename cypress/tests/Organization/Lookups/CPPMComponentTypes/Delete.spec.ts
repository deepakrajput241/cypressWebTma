import { faker } from "@faker-js/faker";

it("Delete CPPM Component Type Data", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Lookup/CJComponentType/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
