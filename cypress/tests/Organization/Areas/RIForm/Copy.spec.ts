import { faker } from "@faker-js/faker";

it("Copy RI Form", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RoomInspectionForm/");

  cy.getButton("Copy").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999999));
  cy.EditInputElement("Description", faker.datatype.number(9999999999));
  cy.clickSaveAndCheckResponse();
});
