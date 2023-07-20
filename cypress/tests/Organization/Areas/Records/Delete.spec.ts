import { faker } from "@faker-js/faker";

it("Delete Area Records", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Area/Create/Identity");
  cy.fillCombobox("Facility", "Automation Facility");
  cy.openFlyoutAndSelectRandomValue("Building");
  cy.EditInputElement("RoomNumber", faker.datatype.number(100));
  cy.fillCombobox("Area Type Description", "Auto");
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
