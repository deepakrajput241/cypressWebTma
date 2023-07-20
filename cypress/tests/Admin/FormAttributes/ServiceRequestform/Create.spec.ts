import { faker } from "@faker-js/faker";

const data = {
  formType: "Menu Form",
  dataAccessUser: "tech101",
  repairCenter: "AUX",
};

it("Create Service Request record With All Fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RequestPortal/Create");
  cy.get("span[ng-bind='WindowTitle']:contains('Service Request Form')").should(
    "be.visible"
  );
  cy.fillInput("Name", faker.random.words(2));
  cy.editTextarea("Description", faker.random.words(10));
  cy.clickCheckbox("ByPassLogin");
  cy.get("select[name='RequestPortalFormTypeId']").select(2);
  cy.openFlyoutAndSelectRandomValue("Data Access User");

  cy.selectRepairCenter();

  cy.contains("Defaults").click();
  cy.get("#toolbarAddDefault").click();
  cy.get("#PageFieldId").select("Action Requested");
  cy.editTextarea("Value", faker.random.words(5));
  cy.getButtonWithText("Save").click();

  cy.clickSaveAndCheckResponse();
});
