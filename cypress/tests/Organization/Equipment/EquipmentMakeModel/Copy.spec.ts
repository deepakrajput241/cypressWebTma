import { faker } from "@faker-js/faker";

it("Copy Equipment Make/Model", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/EquipmentMakeModel/1087/Identity");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("MakeName", faker.random.words(1));
  cy.EditInputElement("ModelNumber", faker.datatype.number(9999999));
  cy.clickSaveAndCheckResponse();
});
