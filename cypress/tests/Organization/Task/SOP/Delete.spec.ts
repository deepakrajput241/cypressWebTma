import { faker } from "@faker-js/faker";

it("Delete SOP", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/SOP/Create");
  cy.EditInputElement("Code", faker.datatype.number(9999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
