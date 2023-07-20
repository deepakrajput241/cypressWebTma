import { faker } from "@faker-js/faker";

it("Copy regrigerant Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Refrigerant");

  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
  cy.openFlyoutAndSelectRandomValue("Refrigerant Type");
  cy.openFlyoutAndSelectRandomValue("Vendor Name");
  cy.openFlyoutAndSelectRandomValue("Location ID");
  cy.clickAndCheckResponse("Save", "POST", "Refrigerant/Create?copyId=?*", 200);
});
