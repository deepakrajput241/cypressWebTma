import { faker } from "@faker-js/faker";

it("Create Key rings with require Field", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/KeyRing/Create");
  cy.EditInputElement("TagNumber", faker.datatype.number(9999));
  cy.EditInputElement("Description", faker.random.words(5));
  cy.clickSaveAndCheckResponse();
});
