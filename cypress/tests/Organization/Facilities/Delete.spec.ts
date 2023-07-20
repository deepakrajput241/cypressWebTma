import { faker } from "@faker-js/faker";

it("Delete Facility", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Facility/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999));
  cy.EditInputElement("Name", faker.datatype.number(99999));
  cy.fillCombobox("Type", "Admin");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
