import { faker } from "@faker-js/faker";

it("Delete Department", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Department/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999999));
  cy.EditInputElement("Name", faker.random.words(2));
  cy.fillCombobox("Department Type Description", "Department type auto");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
