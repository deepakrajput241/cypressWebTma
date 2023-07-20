import { faker } from "@faker-js/faker";

it("Delete Key Holder record fields", () => {
  cy.login(Cypress.env("user1"));
  cy.visit("#!/KeyHolder/Create");
  cy.EditInputElement("Code", faker.datatype.number(999999));
  cy.EditInputElement("FirstName", faker.name.firstName());
  cy.EditInputElement("LastName", faker.name.lastName());
  cy.clickSaveAndCheckResponse();

  cy.wait(500);
  cy.clickDeleteAndCheckResponse();
});
