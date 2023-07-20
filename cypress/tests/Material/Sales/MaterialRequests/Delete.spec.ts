import { faker } from "@faker-js/faker";

it("Delete Material Request record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/MaterialRequest/Create");
  cy.fillCombobox("Department Name", 1);
  cy.fillCombobox("Sales Type Description", 1);
  cy.get("#toolbarAddMaterialRequestLine").click();
  cy.fillCombobox("Part Code", 1);
  cy.fillNumericTextBox(0, faker.datatype.number(5));
  cy.wait(500);
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
