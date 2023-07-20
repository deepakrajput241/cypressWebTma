import { faker } from "@faker-js/faker";

it("Copy cabinet record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/KeyCabinet");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("TagNumber", faker.datatype.number(999999999));
  cy.openFlyoutAndSelectRandomValue("Location ID");
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.clickDeleteAndCheckResponse();
});
