import { faker } from "@faker-js/faker";

it("Delete Vehicle record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/Vehicle/Create");
  cy.EditInputElement("TagNumber", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.openFlyoutAndSelectRandomValue("Facility Name");
  cy.openFlyoutAndSelectRandomValue("Type Description");

  cy.selectRepairCenter();

  cy.contains("Linked Items").click();
  cy.get("#toolbarAddLinkedItem").click();
  cy.get("select[aria-label='Item Type']").select("Asset");
  cy.fillCombobox("Item Code", 1);
  cy.getButtonWithText("Save").click();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
