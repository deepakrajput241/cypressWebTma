import { faker } from "@faker-js/faker";

it("Delete Shop Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Shop/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
