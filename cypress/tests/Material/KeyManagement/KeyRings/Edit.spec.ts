import { faker } from "@faker-js/faker";

it("Edit Key rings", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/KeyRing/Create");
  cy.login(Cypress.env("user1"));
  cy.visit("#!/KeyRing/Create");
  cy.EditInputElement("TagNumber", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.getButton("Edit").click();
  cy.EditInputElement("TagNumber", faker.datatype.number(999999));
  cy.clickSaveAfterEditAndCheckResponse();
});
