import { faker } from "@faker-js/faker";

it("Delete Lock record", { tags: "@smoke" }, () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/Lock/Create");
  cy.fillCombobox("Key #", 1);
  cy.EditInputElement("Number", faker.datatype.number(999999));
  cy.EditInputElement("Description", faker.random.words(2));
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
