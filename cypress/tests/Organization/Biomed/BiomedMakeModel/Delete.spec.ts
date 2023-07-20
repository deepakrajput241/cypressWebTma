import { faker } from "@faker-js/faker";

it("Delete Biomed Make/Model", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/CeEquipmentMakeModel/Create");
  cy.EditInputElement("MakeName", faker.random.words(1));
  cy.EditInputElement("ModelNumber", faker.datatype.number(100));
  cy.fillCombobox("Device Type", "Auto_47");
  cy.fillCombobox("Manufacturer", "3M");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
