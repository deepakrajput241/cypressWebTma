import { faker } from "@faker-js/faker";

it("Delete IT Equipment", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/ITEquipment/Create");
  cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Facility Name");
  cy.openFlyoutAndSelectRandomValue("Type Desc");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
