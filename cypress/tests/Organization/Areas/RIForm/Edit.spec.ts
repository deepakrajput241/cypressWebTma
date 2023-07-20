import { faker } from "@faker-js/faker";

it("Edit RI Form", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RoomInspectionForm/");

  cy.wait(1000);
  cy.getButton("Edit").click();
  cy.EditInputElement("Code", faker.datatype.number(9999999999));
  cy.EditInputElement("Description", faker.datatype.number(9999999999));
  cy.clickSaveAfterEditAndCheckResponse();
});
