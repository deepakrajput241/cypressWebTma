import { faker } from "@faker-js/faker";

it("Delete Trade with Required Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Trade/Create");
  cy.EditInputElement("Code", faker.datatype.number(100000));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
