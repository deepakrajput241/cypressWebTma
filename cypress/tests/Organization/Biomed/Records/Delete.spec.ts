import { faker } from "@faker-js/faker";

it("Delete Biomed Record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CEEquipment/Create");
  cy.EditInputElement("Name", faker.random.words(2));
  cy.fillCombobox("Device Type", "Auto_47");
  cy.fillCombobox("Facility Name", "Automation Facility");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
