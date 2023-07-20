import { faker } from "@faker-js/faker";

it("Edit Refrigerant record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit(`#!/Refrigerant/Create`);
  cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
  cy.openFlyoutAndSelectRandomValue("Refrigerant Type");
  cy.openFlyoutAndSelectRandomValue("Vendor Name");
  cy.openFlyoutAndSelectRandomValue("Location ID");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.get("span[ng-bind='WindowTitle']:contains('Refrigerants')").should(
    "be.visible"
  );
  cy.getButton("Edit").click();
  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.EditInputElement("TagNumber", faker.datatype.number(9999999));
  cy.clickAndCheckResponse("Save", "POST", "/Refrigerant/Edit?*", 200);
});
