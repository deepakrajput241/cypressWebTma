import { faker } from "@faker-js/faker";

it("Copy Area Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Area/14493/Identity");

  cy.getButton("Copy").click();
  cy.EditInputElement("RoomNumber", faker.datatype.number(99999));
  cy.openFlyoutAndSelectRandomValue("Area Type");
  cy.clickSaveAndCheckResponse();
});
