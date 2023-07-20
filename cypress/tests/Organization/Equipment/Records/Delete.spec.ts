import { faker } from "@faker-js/faker";

it("Delete Equipment", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Equipment/Create");
  cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
  cy.EditInputElement("Description", faker.random.words(1));
  cy.fillCombobox("Type", "Auto-11");
  cy.fillCombobox("Facility Name", "Automation Facility");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
