import { faker } from "@faker-js/faker";

it("Copy Key rings", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/KeyRing");
  cy.wait(500);
  cy.getButton("Copy").click();
  cy.EditInputElement("TagNumber", faker.datatype.number(999999));
  cy.clickSaveAndCheckResponse();
});
