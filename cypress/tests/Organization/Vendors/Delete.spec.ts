import { faker } from "@faker-js/faker";

it("Delete Vendor record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Vendor/Create");
  cy.EditInputElement("Code", faker.datatype.number(99999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.fillCombobox("Vendor Type Description", "Auto type");
  cy.clickCheckbox("IsVendor");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
