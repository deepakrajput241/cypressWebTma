import { faker } from "@faker-js/faker";

it("Delete Task Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Task/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(1));
  cy.openFlyoutAndSelectRandomValue("Type Description");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
