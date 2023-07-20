import { faker } from "@faker-js/faker";

const data = {
  formType: "Menu Form",
  dataAccessUser: "tech101",
  repairCenter: "AUX",
};

it("Delete Service Request record", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("/#!/RequestPortal/Create");
  cy.EditInputElement("Name", faker.random.words(2));
  cy.get("select[ng-model='Data.RequestPortalFormTypeId']").select("Menu Form");
  cy.selectRepairCenter();
  cy.clickSaveAndCheckResponse();

  cy.wait(1000);
  cy.contains("a", "Identity").click();
  cy.clickDeleteAndCheckResponse();
});
