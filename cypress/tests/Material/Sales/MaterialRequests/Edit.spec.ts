import { faker } from "@faker-js/faker";

const data = {
  departmentName: "Account Centers",
  salesTypeDescription: "Audi",
  requestor: "JL Banks",
  partDescription: "Auto test Description",
};

it("Edit Material Request record", () => {
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

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.fillCombobox("Department Name", 1);
  cy.fillCombobox("Sales Type Description", 1);
  cy.clickSaveAfterEditAndCheckResponse();
});
