import { faker } from "@faker-js/faker";

it("Delete Equipment Make/Model", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/EquipmentMakeModel/Create");
  cy.EditInputElement("MakeName", faker.random.words(1));
  cy.EditInputElement("ModelNumber", faker.datatype.number(9999999));
  cy.fillCombobox("Equipment Type", "Auto-11");
  cy.fillCombobox("Manufacturer", "3M");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
