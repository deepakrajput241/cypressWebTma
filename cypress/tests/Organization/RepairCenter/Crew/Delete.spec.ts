import { faker } from "@faker-js/faker";

it("Edit Crew Record With Required Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Crew/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
